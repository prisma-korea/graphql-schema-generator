import {DMMF, GeneratorConfig} from '@prisma/generator-helper';

import {DataModel} from './parse';
import {Definition, ReservedName, SDL} from './converters/types';

import addTypeModifiers from './converters/addTypeModifiers';
import convertType from './converters/convertType';
import extractScalars from './extractors/extractScalars';
import formatDefinition from './formatters/formatDefinition';
import formatField from './formatters/formatField';
import formatScalar from './formatters/formatScalar';

import {removeExclamation, sdl} from './utils';

const getTypeConvertedFields = (model: DMMF.Model): DMMF.Field[] => {
  if (!model) {
    return [];
  }

  const shouldIgnore = model.fields.reduce(
    (acc: {[key: string]: boolean}, cur: DMMF.Field) => {
      const {relationFromFields, documentation} = cur;

      if (relationFromFields) {
        relationFromFields.forEach((field: string) => {
          acc[field] = true;
        });
      }
      // check if documentation is not empty and has @render(IGNORE) match
      if (documentation && documentation.match(/@render\(IGNORE\)/)) {
        acc[cur.name] = true;
      }

      return acc;
    },
    {},
  );

  const typeConvertedFields = model.fields.reduce(
    (collected: DMMF.Field[], field: DMMF.Field): DMMF.Field[] => {
      const {name} = field;
      if (shouldIgnore[name]) {
        return collected;
      }

      const transformers = [convertType, addTypeModifiers];

      const typeConvertedField = transformers.reduce((acc, transformer) => {
        const type = transformer(acc, model);

        return {...acc, type};
      }, field);

      return [...collected, typeConvertedField];
    },
    [],
  );

  return typeConvertedFields;
};

const transpile = (
  dataModel: DataModel,
  options?: GeneratorConfig['config'],
): string => {
  const {models, enums, names} = dataModel;
  const queryFields = dataModel.names.reduce((acc: string[], name) => {
    const modelFields = getTypeConvertedFields(models[name]);
    const {name: idName} = modelFields.find(({type}) => {
      if (typeof type !== 'string') {
        return false;
      }

      return type.match(SDL.ID);
    }) ?? {name: 'id'};

    return [
      ...acc,
      `${name.toLowerCase()}(${idName}: ID!): ${name}`,
      `${name.toLowerCase()}s: [${name}!]!`,
    ];
  }, []);

  const queriesOfSchema = formatDefinition({
    type: Definition.type,
    name: ReservedName.Query,
    fields: queryFields,
  });

  const mutationFields = dataModel.names.reduce((acc: string[], name) => {
    const modelFields = getTypeConvertedFields(models[name]);
    // Do not add mutations for models with all fields ignored
    if (modelFields.length === 0) {
      return acc;
    }
    // Do not add mutations for models with only id field
    if (modelFields.length === 1 && modelFields[0].name === 'id') {
      return acc;
    }
    const {name: idName} = modelFields.find(({type}) => {
      if (typeof type !== 'string') {
        return false;
      }

      return type.match(SDL.ID);
    }) ?? {name: 'id'};

    return [
      ...acc,
      `create${name}(${name.toLowerCase()}: ${name}CreateInput!): ${name}`,
      `update${name}(${name.toLowerCase()}: ${name}UpdateInput!): ${name}`,
      `delete${name}(${idName}: ID!): ${name}`,
    ];
  }, []);

  const mutationInputs = dataModel.names.reduce(
    (inputs: string[], modelName) => {
      const modelFields = getTypeConvertedFields(models[modelName]);

      const fieldsWithoutID = modelFields.reduce(
        (fields: DMMF.Field[], cur) => {
          const {type} = cur;

          if (typeof type === 'string' && type.match(SDL.ID)) {
            return fields;
          }

          return [...fields, cur];
        },
        [],
      );
      if (!fieldsWithoutID.length) {
        return inputs;
      }
      const createInputFields = fieldsWithoutID.map(
        ({name, type}) => `${name}: ${type}`,
      );

      const updateInputFields = fieldsWithoutID.map(
        ({name, type}) => `${name}: ${removeExclamation(type as string)}`,
      );

      return [
        ...inputs,
        formatDefinition({
          type: Definition.input,
          name: `${modelName}CreateInput`,
          fields: createInputFields,
        }) +
          formatDefinition({
            type: Definition.input,
            name: `${modelName}UpdateInput`,
            fields: updateInputFields,
          }),
      ];
    },
    [],
  );

  let mutationsOfSchema: string = '';

  // Only add mutations if there are any mutation inputs
  if (mutationInputs.length) {
    const mutation = formatDefinition({
      type: Definition.type,
      name: ReservedName.Mutation,
      fields: mutationFields,
    });

    mutationsOfSchema = mutationInputs + mutation;
  }

  const scalars = extractScalars(dataModel);

  const scalarsOfSchema = scalars
    .map((scalar) => formatScalar(scalar))
    .join('');

  const enumsOfSchema = Object.entries(enums)
    .map(([name, anEnum]) => {
      const fields = anEnum.map(({name: field}) => `\t${field}`);

      return formatDefinition({
        type: Definition.enum,
        name,
        fields,
      });
    })
    .join('');

  const modelsOfSchema = names
    .map((name) => {
      const fields = getTypeConvertedFields(models[name]).map((field) =>
        formatField(field),
      );

      return formatDefinition({
        type: Definition.type,
        name,
        fields,
      });
    })
    .join('');

  const schema =
    (options?.createQuery === 'true' ? queriesOfSchema : '') +
    (options?.createMutation === 'true' ? mutationsOfSchema : '') +
    scalarsOfSchema +
    enumsOfSchema +
    modelsOfSchema;
  return sdl(schema);
};

export default transpile;
