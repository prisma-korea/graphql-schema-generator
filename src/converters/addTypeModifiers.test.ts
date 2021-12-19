import {DMMF} from '@prisma/generator-helper';

import {PSL} from './types';
import addTypeModifier from './addTypeModifiers';

describe('addTypeModifier', () => {
  it('adds ! for non-nullable type', () => {
    expect(
      addTypeModifier(
        {type: PSL.String, isRequired: false} as DMMF.Field,
        {} as DMMF.Model,
      ),
    ).toBe('String');

    expect(
      addTypeModifier(
        {type: PSL.String, isRequired: true} as DMMF.Field,
        {} as DMMF.Model,
      ),
    ).toBe('String!');
  });

  it('add [!]! for list', () => {
    const field = {type: PSL.String, isList: true, isRequired: true};

    expect(addTypeModifier(field as DMMF.Field, {} as DMMF.Model)).toBe(
      '[String!]!',
    );
  });
});
