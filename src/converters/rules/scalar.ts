import { GraphQL, Prisma, Rule } from 'converters/types';

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
      const { type } = field;

      if (type === Prisma.BigInt) {
        return true;
      }

      return false;
    },
    transformer: () => GraphQL.Int,
  },
  {
    matcher: (field) => {
      const { type } = field;

      if (type === Prisma.Decimal) {
        return true;
      }

      return false;
    },
    transformer: () => GraphQL.Float,
  },
  {
    matcher: (field) => {
      const { isId } = field;

      return isId;
    },
    transformer: () => GraphQL.ID,
  },
];

export default rules;
