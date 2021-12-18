import {PSL, Scalar} from './converters/types';

import {DMMF} from '@prisma/generator-helper';
import {DataModel} from './parse';
import addTypeModifiers from './converters/addTypeModifiers';
import convertType from './converters/convertType';
import formatDefinition from './formatters/formatDefinition';
import formatField from './formatters/formatField';
import formatScalar from './formatters/formatScalar';

const getFieldTypePair = (model: DMMF.Model): string[] => {
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

  const pairs = model.fields.map((field) => {
    const {name} = field;

    if (shouldIgnore[name]) {
      return '';
    }

    const transformers = [convertType, addTypeModifiers];

    const typeTransformedField = transformers.reduce((acc, transformer) => {
      const type = transformer(acc);

      return {...acc, type};
    }, field);

    return formatField(typeTransformedField);
  });

  return pairs;
};

const extractScalars = (dataModel: DataModel): string[] => {
  const {models, names} = dataModel;

  const scalars = new Set<string>();

  names.forEach((name) => {
    const model = models[name];

    model.fields.forEach((field) => {
      const {type} = field;

      if (type === PSL.DateTime) {
        scalars.add(Scalar.DateTime);
      }

      if (type === PSL.Bytes) {
        scalars.add(Scalar.ByteArray);
      }
    });
  });

  return Array.from(scalars.values());
};

const transpile = (dataModel: DataModel): string => {
  const {models, enums, names} = dataModel;

  const scalars = extractScalars(dataModel);

  const scalarsOfSchema = scalars
    .map((scalar) => formatScalar(scalar))
    .join('');

  const enumsOfSchema = Object.entries(enums)
    .map(([name, anEnum]) => {
      const fields = anEnum.map(({name: field}) => `\t${field}`);

      return formatDefinition({
        type: 'enum',
        name,
        fields,
      });
    })
    .join('');

  const modelsOfSchema = names
    .map((name) => {
      const fields = getFieldTypePair(models[name]);

      return formatDefinition({
        type: 'type',
        name,
        fields,
      });
    })
    .join('');

  const schema = scalarsOfSchema + enumsOfSchema + modelsOfSchema;

  return schema;
};

export default transpile;
