import {DMMF} from '@prisma/generator-helper';

import {Rule} from './types';
import rules from './rules/scalar';

const convertScalar = (
  initialField: DMMF.Field,
  model: DMMF.Model,
): string | DMMF.SchemaEnum | DMMF.OutputType | DMMF.SchemaArg => {
  const {type: convertedType} = rules.reduce(
    (field, {matcher, transformer}: Rule): DMMF.Field => {
      if (matcher(field, model)) {
        return transformer(field);
      }

      return field;
    },
    initialField,
  );

  return convertedType;
};

export default convertScalar;
