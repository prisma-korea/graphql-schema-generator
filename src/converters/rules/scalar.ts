import {PSL, Rule, SDL, Scalar} from '../types';
import extractId from '../../extractors/extractId';
import extractUniques from '../../extractors/extractUniques';

const rules: Rule[] = [
  {
    matcher: (field) => {
      const {type} = field;

      if (type === PSL.Json) {
        return true;
      }

      return false;
    },
    transformer: (field) => ({...field, type: SDL.String}),
  },
  {
    matcher: (field) => {
      const {type} = field;

      if (type === PSL.BigInt) {
        return true;
      }

      return false;
    },
    transformer: (field) => ({...field, type: SDL.Int}),
  },
  {
    matcher: (field) => {
      const {type} = field;

      if (type === PSL.Decimal) {
        return true;
      }

      return false;
    },
    transformer: (field) => ({...field, type: SDL.Float}),
  },
  {
    matcher: (field) => {
      const {type} = field;

      if (type === PSL.Bytes) {
        return true;
      }

      return false;
    },
    transformer: (field) => ({...field, type: Scalar.ByteArray}),
  },
  {
    matcher: (field) => {
      const {isId} = field;

      return isId;
    },
    transformer: (field) => ({...field, type: SDL.ID}),
  },
  {
    matcher: (field, model) => {
      const {isUnique} = field;

      const idField = extractId(model);
      const uniqueFields = extractUniques(model);

      return !idField && uniqueFields.length === 1 && isUnique;
    },
    transformer: (field) => ({...field, type: SDL.ID}),
  },
];

export default rules;
