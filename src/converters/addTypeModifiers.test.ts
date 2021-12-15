import { DMMF } from '@prisma/generator-helper';

import { Prisma } from './types';
import addTypeModifier from './addTypeModifiers';

describe('addTypeModifier', () => {
  it('adds [] for list type', () => {
    expect(
      addTypeModifier({ type: Prisma.String, isList: false } as DMMF.Field),
    )
      .toBe('String');

    expect(
      addTypeModifier({ type: Prisma.String, isList: true } as DMMF.Field),
    )
      .toBe('[String]');
  });

  it('adds ! for non-nullable type', () => {
    expect(
      addTypeModifier({ type: Prisma.String, isRequired: false } as DMMF.Field),
    )
      .toBe('String');

    expect(
      addTypeModifier({ type: Prisma.String, isRequired: true } as DMMF.Field),
    )
      .toBe('String!');
  });
});
