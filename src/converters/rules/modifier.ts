import { DMMF } from '@prisma/generator-helper';

import { Rule } from '../types';

const addBrasket = (field: DMMF.Field, type: DMMF.Field['type']) => `[${type}]`;
const addExclamation = (field: DMMF.Field, type: DMMF.Field['type']) => `${type}!`;

const rules: Rule[] = [
  {
    matcher: (field) => {
      const { isList } = field;

      return isList;
    },
    transformer: addBrasket,
  },
  {
    matcher: (field) => {
      const { isRequired } = field;

      return isRequired;
    },
    transformer: addExclamation,
  },
];

export default rules;
