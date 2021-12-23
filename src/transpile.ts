import {DMMF, GeneratorConfig} from '@prisma/generator-helper';

import {DataModel} from './parse';
import {Definition, ReservedName, SDL} from './converters/types';

import addTypeModifiers from './converters/addTypeModifiers';
import convertType from './converters/convertType';
import extractScalars from './extractors/extractScalars';
import formatDefinition from './formatters/formatDefinition';
import formatField from './formatters/formatField';
import formatScalar from './formatters/formatScalar';

import {sdl} from './utils';

const getTypeConvertedFields = (model: DMMF.Model): DMMF.Field[] => {
  if (!model) {
    return [];
  }

  const shouldIgnore = model.fields.reduce(
    (acc: {[key: string]: boolean}, cur: DMMF.Field) => {
      const {relationFromFields} = cur;

      if (relationFromFields) {
        relationFromFields.forEach((field: string) => {
          acc[field] = true;
        });
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
    scalarsOfSchema +
    enumsOfSchema +
    modelsOfSchema;

  return sdl(schema);
};

export default transpile;
