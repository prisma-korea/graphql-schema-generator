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
      const { isId } = field;

      return isId;
    },
    transformer: () => GraphQL.ID,
  },
];

export default rules;
