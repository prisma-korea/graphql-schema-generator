import { DMMF } from '@prisma/generator-helper';

import formatModel from 'formatters/modelFormatter';
import formatField from './formatters/fieldFormatter';
import { DataModel, Models } from './parser';

const getFieldTypePair = (models: Models, modelName: string) => {
  const model = models[modelName];

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

  const pairs = model.fields.map(({ name, type, isList }) => {
    if (shouldIgnore[name]) {
      return '';
    }

    return formatField({ name, type, typeOption: { isList } });
  });

  return pairs;
};

const transpile = (dataModel: DataModel) => {
  const { models, names } = dataModel;

  const graphqlSchema = names.map((name) => {
    const fields = getFieldTypePair(models, name);

    return formatModel(name, fields);
  }).join('');

  return graphqlSchema;
};

export default transpile;
