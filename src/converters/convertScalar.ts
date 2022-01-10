import {DMMF} from '@prisma/generator-helper';

import type {Rule} from './types';
import existingRules from './rules/scalar';

import type {Config} from '../generateGraphqlSchema';

const convertScalar = (
  initialField: DMMF.Field,
  model: DMMF.Model,
  config?: Config,
): DMMF.Field => {
  const rules = config?.customRules ? config.customRules : existingRules;

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

export default convertScalar;
