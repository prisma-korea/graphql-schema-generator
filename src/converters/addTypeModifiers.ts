import { DMMF } from '@prisma/generator-helper';

import rules from './rules/modifier';
import { Rule } from './types';

const addTypeModifilers = (field: DMMF.Field) => {
  const initialType = field.type;

  const convertedType = rules.reduce((type, {
    matcher, transformer,
  }: Rule): string => {
    if (matcher(field)) {
      return transformer(field, type);
    }

    // TODO
    if (typeof type !== 'string') {
      return type.name;
    }

    return type;
  }, initialType);

  return convertedType;
};

export default addTypeModifilers;
