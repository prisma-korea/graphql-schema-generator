import { DMMF } from '@prisma/generator-helper';

import { SDL, PSL, Scalar } from './types';
import convertScalar from './convertScalar';
import store from '../store';

jest.mock('../store');

describe('convertScalar', () => {
  it.each(['String', 'Boolean', 'Int', 'Float'])('does nothing for %s', (type) => {
    type T = 'String' | 'Boolean' | 'Int' | 'Float'

    const field = {
      type: PSL[type as T],
    };

    expect(convertScalar(field as DMMF.Field)).toBe(SDL[type as T]);
  });

  it('converts Json -> String', () => {
    const field = {
      type: PSL.Json,
    };

    expect(convertScalar(field as DMMF.Field)).toBe(SDL.String);
  });

  it('converts BigInt to Int', () => {
    const field = {
      type: PSL.BigInt,
    };

    expect(convertScalar(field as DMMF.Field)).toBe(SDL.Int);
  });

  it('converts Decimal to Float', () => {
    const field = {
      type: PSL.Decimal,
    };

    expect(convertScalar(field as DMMF.Field)).toBe(SDL.Float);
  });

  it('converts Bytes to ByteArray, and store it to store for generating scalar', () => {
    const field = {
      type: PSL.Bytes,
    };

    expect(convertScalar(field as DMMF.Field)).toBe(Scalar.ByteArray);

    expect(store.addScalar).toBeCalledWith(Scalar.ByteArray);
  });

  it('stores DateTime to store for generating scalar', () => {
    const field = {
      type: PSL.DateTime,
    };

    expect(convertScalar(field as DMMF.Field)).toBe(Scalar.DateTime);

    expect(store.addScalar).toBeCalledWith(Scalar.DateTime);
  });

  it('converts every type declared as @id to ID', () => {
    expect(convertScalar({ type: PSL.String, isId: false } as DMMF.Field)).toBe(SDL.String);
    expect(convertScalar({ type: PSL.Json, isId: false } as DMMF.Field)).toBe(SDL.String);

    expect(convertScalar({ type: PSL.String, isId: true } as DMMF.Field)).toBe(SDL.ID);
    expect(convertScalar({ type: PSL.Json, isId: true } as DMMF.Field)).toBe(SDL.ID);
  });
});
