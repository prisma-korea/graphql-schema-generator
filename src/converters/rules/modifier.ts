import {DMMF} from '@prisma/generator-helper';
import {Rule} from '../types';

const addBrasket = (field: DMMF.Field, type: DMMF.Field['type']): string =>
  `[${type}]`;

const addExclamation = (_field: DMMF.Field, type: DMMF.Field['type']): string =>
  `${type}!`;

const rules: Rule[] = [
  {
    matcher: (field) => {
      const {isList, isRequired} = field;

      if (isList) {
        console.assert(isRequired);
      }

      return isList;
    },
    transformer: (field: DMMF.Field, type: DMMF.Field['type']) => {
      const ret = [addExclamation, addBrasket, addExclamation].reduce(
        (acc, cur) => cur(field, acc),
        type,
      );

      return ret as string;
    },
  },
  {
    matcher: (field) => {
      const {isList, isRequired} = field;

      return !isList && isRequired;
    },
    transformer: addExclamation,
  },
];

export default rules;
