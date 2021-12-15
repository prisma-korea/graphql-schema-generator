import { DMMF } from '@prisma/generator-helper';

import convertScalar from './convertScalar';
import { GraphQL, Prisma } from './types';

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
});
