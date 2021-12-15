import { DMMF } from '@prisma/generator-helper';

import convertType from 'converters/convertType';
import addTypeModifiers from 'converters/addTypeModifiers';

import formatModel from 'formatters/formatModel';
import formatField from './formatters/formatField';

import { DataModel } from './parse';

const getFieldTypePair = (model: DMMF.Model) => {
  if (!model) {
    return [];
  }

  const shouldIgnore = model.fields.reduce((
    acc : {[key: string]: boolean},
    cur: DMMF.Field,
  ) => {
    const { relationFromFields } = cur;

    if (relationFromFields) {
      relationFromFields.forEach((field: string) => {
        acc[field] = true;
      });
    }

    return acc;
  }, {});

  const pairs = model.fields.map((field) => {
    const { name } = field;

    if (shouldIgnore[name]) {
      return '';
    }

    const transformers = [
      convertType,
      addTypeModifiers,
    ];

    const typeTransformedField = transformers.reduce((acc, transformer) => {
      const type = transformer(acc);

      return { ...acc, type };
    }, field);

    return formatField(typeTransformedField);
  });

  return pairs;
};

const transpile = (dataModel: DataModel) => {
  const { models, names } = dataModel;

  const graphqlSchema = names.map((name) => {
    const fields = getFieldTypePair(models[name]);

    return formatModel(name, fields);
  }).join('');

  return graphqlSchema;
};

export default transpile;
