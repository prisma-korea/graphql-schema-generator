import { DMMF } from '@prisma/generator-helper';

import { GraphQL, Prisma, Scalar } from './types';
import convertScalar from './convertScalar';
import store from '../store';

jest.mock('../store');

describe('convertScalar', () => {
  it.each(['String', 'Boolean', 'Int', 'Float'])('does nothing for %s', (type) => {
    type T = 'String' | 'Boolean' | 'Int' | 'Float'

    const field = {
      type: Prisma[type as T],
    };

    expect(convertScalar(field as DMMF.Field)).toBe(GraphQL[type as T]);
  });

  it('converts Json -> String', () => {
    const field = {
      type: Prisma.Json,
    };

    expect(convertScalar(field as DMMF.Field)).toBe(GraphQL.String);
  });

  it('converts BigInt to Int', () => {
    const field = {
      type: Prisma.BigInt,
    };

    expect(convertScalar(field as DMMF.Field)).toBe(GraphQL.Int);
  });

  it('converts Decimal to Float', () => {
    const field = {
      type: Prisma.Decimal,
    };

    expect(convertScalar(field as DMMF.Field)).toBe(GraphQL.Float);
  });

  it('converts Bytes to ByteArray, and store it to store for generating scalar', () => {
    const field = {
      type: Prisma.Bytes,
    };

    expect(convertScalar(field as DMMF.Field)).toBe(Scalar.ByteArray);

    expect(store.addScalar).toBeCalledWith(Scalar.ByteArray);
  });

  it('stores DateTime to store for generating scalar', () => {
    const field = {
      type: Prisma.DateTime,
    };

    expect(convertScalar(field as DMMF.Field)).toBe(Scalar.DateTime);

    expect(store.addScalar).toBeCalledWith(Scalar.DateTime);
  });

  it('converts every type declared as @id to ID', () => {
    expect(convertScalar({ type: Prisma.String, isId: false } as DMMF.Field)).toBe(GraphQL.String);
    expect(convertScalar({ type: Prisma.Json, isId: false } as DMMF.Field)).toBe(GraphQL.String);

    expect(convertScalar({ type: Prisma.String, isId: true } as DMMF.Field)).toBe(GraphQL.ID);
    expect(convertScalar({ type: Prisma.Json, isId: true } as DMMF.Field)).toBe(GraphQL.ID);
  });
});
