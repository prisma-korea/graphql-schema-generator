import {DMMF} from '@prisma/generator-helper';

import {PSL, SDL, Scalar} from './types';
import convertScalar from './convertScalar';
import store from '../store';

describe('convertScalar', () => {
  beforeEach(() => {
    store.reset();
  });

  it.each(['String', 'Boolean', 'Int', 'Float'])(
    'does nothing for %s',
    (type) => {
      type T = 'String' | 'Boolean' | 'Int' | 'Float';

      const field = {
        type: PSL[type as T],
      };

      expect(convertScalar(field as DMMF.Field, {} as DMMF.Model)).toBe(
        SDL[type as T],
      );
    },
  );

  it('converts Json -> String', () => {
    const field = {
      type: PSL.Json,
    };

    expect(convertScalar(field as DMMF.Field, {} as DMMF.Model)).toBe(
      SDL.String,
    );
  });

  it('converts BigInt to Int', () => {
    const field = {
      type: PSL.BigInt,
    };

    expect(convertScalar(field as DMMF.Field, {} as DMMF.Model)).toBe(SDL.Int);
  });

  it('converts Decimal to Float', () => {
    const field = {
      type: PSL.Decimal,
    };

    expect(convertScalar(field as DMMF.Field, {} as DMMF.Model)).toBe(
      SDL.Float,
    );
  });

  it('converts Bytes to ByteArray', () => {
    const field = {
      type: PSL.Bytes,
    };

    expect(convertScalar(field as DMMF.Field, {} as DMMF.Model)).toBe(
      Scalar.ByteArray,
    );
  });

  it('converts every type declared as @id to ID', () => {
    expect(
      convertScalar(
        {type: PSL.String, isId: false} as DMMF.Field,
        {} as DMMF.Model,
      ),
    ).toBe(SDL.String);

    expect(
      convertScalar(
        {type: PSL.Json, isId: false} as DMMF.Field,
        {} as DMMF.Model,
      ),
    ).toBe(SDL.String);

    expect(
      convertScalar(
        {type: PSL.String, isId: true} as DMMF.Field,
        {} as DMMF.Model,
      ),
    ).toBe(SDL.ID);

    expect(
      convertScalar(
        {type: PSL.Json, isId: true} as DMMF.Field,
        {} as DMMF.Model,
      ),
    ).toBe(SDL.ID);
  });

  it('converts @unique to ID if no @id exists', () => {
    expect(
      convertScalar(
        {type: PSL.String, isUnique: true, isId: false} as DMMF.Field,
        {name: 'User'} as DMMF.Model,
      ),
    ).toBe(SDL.ID);

    store.add({model: 'User', field: {name: 'field'} as DMMF.Field});

    expect(
      convertScalar(
        {type: PSL.String, isUnique: true, isId: false} as DMMF.Field,
        {name: 'User'} as DMMF.Model,
      ),
    ).toBe(SDL.String);
  });
});
