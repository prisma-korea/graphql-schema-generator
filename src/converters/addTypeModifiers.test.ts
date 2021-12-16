import { DMMF } from '@prisma/generator-helper';

import { PSL } from './types';
import addTypeModifier from './addTypeModifiers';

describe('addTypeModifier', () => {
  it('adds [] for list type', () => {
    expect(
      addTypeModifier({ type: PSL.String, isList: false } as DMMF.Field),
    )
      .toBe('String');

    expect(
      addTypeModifier({ type: PSL.String, isList: true } as DMMF.Field),
    )
      .toBe('[String]');
  });

  it('adds ! for non-nullable type', () => {
    expect(
      addTypeModifier({ type: PSL.String, isRequired: false } as DMMF.Field),
    )
      .toBe('String');

    expect(
      addTypeModifier({ type: PSL.String, isRequired: true } as DMMF.Field),
    )
      .toBe('String!');
  });

  it('add []! for non-nullable list', () => {
    expect(
      addTypeModifier({ type: PSL.String, isRequired: true, isList: true } as DMMF.Field),
    )
      .toBe('[String]!');
  });
});
