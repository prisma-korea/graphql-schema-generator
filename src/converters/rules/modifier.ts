import {DMMF} from '@prisma/generator-helper';
import {Rule} from '../types';

const addBrasket = (field: DMMF.Field): DMMF.Field => {
  const {type} = field;

  return {...field, type: `[${type}]`};
};

const addExclamation = (field: DMMF.Field): DMMF.Field => {
  const {type} = field;

  return {...field, type: `${type}!`};
};

const rules: Rule[] = [
  {
    matcher: (field) => {
      const {isList, isRequired} = field;

      if (isList) {
        console.assert(isRequired);
      }

      return isList;
    },
    transformer: (field) => {
      return [addExclamation, addBrasket, addExclamation].reduce(
        (acc, cur) => cur(acc),
        field,
      );
    },
  },
  {
    matcher: (field) => {
      const {isList, isRequired} = field;

      return !isList && isRequired;
    },
    transformer: (field) => addExclamation(field),
  },
];

export default rules;
