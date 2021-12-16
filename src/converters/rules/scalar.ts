import {
  SDL, PSL, Rule, Scalar,
} from '../types';
import store from '../../store';

const rules: Rule[] = [
  {
    matcher: (field) => {
      const { type } = field;

      if (type === PSL.Json) {
        return true;
      }

      return false;
    },
    transformer: () => SDL.String,
  },
  {
    matcher: (field) => {
      const { type } = field;

      if (type === PSL.BigInt) {
        return true;
      }

      return false;
    },
    transformer: () => SDL.Int,
  },
  {
    matcher: (field) => {
      const { type } = field;

      if (type === PSL.Decimal) {
        return true;
      }

      return false;
    },
    transformer: () => SDL.Float,
  },
  {
    matcher: (field) => {
      const { type } = field;

      if (type === PSL.Bytes) {
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

      if (type === PSL.DateTime) {
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
    transformer: () => SDL.ID,
  },
];

export default rules;
