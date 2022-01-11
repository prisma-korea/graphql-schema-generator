import {DMMF} from '@prisma/generator-helper';

import {Rule} from './types';
import rules from './rules/modifier';

const addTypeModifiers = (
  initialField: DMMF.Field,
  model: DMMF.Model,
): DMMF.Field => {
  const newField = rules.reduce(
    (field, {matcher, transformer}: Rule): DMMF.Field => {
      if (matcher(field, model)) {
        return transformer(field);
      }

      return field;
    },
    initialField,
  );

  return newField;
};

export default addTypeModifiers;
