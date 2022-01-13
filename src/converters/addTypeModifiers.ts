import {DMMF} from '@prisma/generator-helper';

import {Rule} from './types';
import existingRules from './rules/modifier';

import type {Config} from '../generateGraphqlSchema';

const addTypeModifiers = (
  initialField: DMMF.Field,
  model: DMMF.Model,
  config?: Config,
): DMMF.Field => {
  const rules = config?.customRules?.afterAddingTypeModifiers
    ? config.customRules.afterAddingTypeModifiers
    : existingRules;

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
