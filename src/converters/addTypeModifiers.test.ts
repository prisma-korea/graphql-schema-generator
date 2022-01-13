import {DMMF} from '@prisma/generator-helper';

import {CustomRules, PSL} from './types';
import addTypeModifier from './addTypeModifiers';

describe('addTypeModifier', () => {
  context('when custom rule is provided', () => {
    it('ignores existing rule, and apply custom rules', () => {
      const customRules: CustomRules = {
        afterAddingTypeModifiers: [
          {
            matcher: (field) => {
              const {type} = field;

              return type === 'String';
            },
            transformer: (field) => {
              const {type} = field;

              return {...field, type: `${type}?`};
            },
          },
        ],
      };

      expect(
        addTypeModifier(
          {type: PSL.String, isRequired: true} as DMMF.Field,
          {} as DMMF.Model,
        ),
      ).toEqual({type: 'String!', isRequired: true});

      expect(
        addTypeModifier(
          {type: PSL.String, isRequired: true} as DMMF.Field,
          {} as DMMF.Model,
          {customRules},
        ),
      ).toEqual({type: 'String?', isRequired: true});
    });
  });

  context('when custom rule is not provided', () => {
    it('adds ! for non-nullable type', () => {
      expect(
        addTypeModifier(
          {type: PSL.String, isRequired: false} as DMMF.Field,
          {} as DMMF.Model,
        ),
      ).toEqual({type: PSL.String, isRequired: false});

      expect(
        addTypeModifier(
          {type: PSL.String, isRequired: true} as DMMF.Field,
          {} as DMMF.Model,
        ),
      ).toEqual({type: 'String!', isRequired: true});
    });

    it('add [!]! for list', () => {
      const field = {type: PSL.String, isList: true, isRequired: true};

      expect(addTypeModifier(field as DMMF.Field, {} as DMMF.Model)).toEqual({
        type: '[String!]!',
        isList: true,
        isRequired: true,
      });
    });
  });
});
