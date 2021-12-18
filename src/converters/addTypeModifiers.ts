import {DMMF} from '@prisma/generator-helper';
import {Rule} from './types';
import rules from './rules/modifier';

const addTypeModifiers = (
  field: DMMF.Field,
): string | DMMF.SchemaEnum | DMMF.OutputType | DMMF.SchemaArg => {
  const initialType = field.type;

  const convertedType = rules.reduce(
    (type, {matcher, transformer}: Rule): string => {
      if (matcher(field)) {
        return transformer(field, type);
      }

      // TODO
      if (typeof type !== 'string') {
        return type.name;
      }

      return type;
    },
    initialType,
  );

  return convertedType;
};

export default addTypeModifiers;
