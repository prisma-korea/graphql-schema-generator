import {
  GraphQL, Prisma, Rule, Scalar,
} from 'converters/types';
import store from '../../store';

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
      const { type } = field;

      if (type === Prisma.Bytes) {
        return true;
      }

      return false;
    },
    transformer: () => {
      store.addScalar(Scalar.ByteArray);

      return Scalar.ByteArray;
    },
  },
  {
    matcher: (field) => {
      const { type } = field;

      if (type === Prisma.DateTime) {
        return true;
      }

      return false;
    },
    transformer: () => {
      store.addScalar(Scalar.DateTime);

      return Scalar.DateTime;
    },
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
