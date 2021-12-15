import { DMMF } from '@prisma/generator-helper';

import { GraphQL, Prisma, Rule } from './types';

const rules: Rule[] = [
  {
    matcher: (field) => {
      const { type } = field;

      if (type === Prisma.Json) {
        return true;
      }

      return false;
    },
    transformer: () => GraphQL.String,
  },
  {
    matcher: (field) => {
      const { isId } = field;

      return isId;
    },
    transformer: () => GraphQL.ID,
  },
];

const convertScalar = (field: DMMF.Field) => {
  const initialType = field.type;

  const convertedType = rules.reduce((type, {
    matcher, transformer,
  }: Rule): string => {
    if (matcher(field)) {
      return transformer(field);
    }

    // TODO
    if (typeof type !== 'string') {
      return type.name;
    }

    return type;
  }, initialType);

  return convertedType;
};

export default convertScalar;
