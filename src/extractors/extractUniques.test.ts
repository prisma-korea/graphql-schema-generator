import {DMMF} from '@prisma/generator-helper';

import extractUniques from './extractUniques';

describe('extractUniques', () => {
  it('extracts all fields that is @unique', () => {
    const model = {
      fields: [
        {name: '1', isUnique: true} as DMMF.Field,
        {name: '2', isUnique: false} as DMMF.Field,
        {name: '3', isUnique: true} as DMMF.Field,
      ],
    } as DMMF.Model;

    expect(extractUniques(model)).toEqual([
      {name: '1', isUnique: true} as DMMF.Field,
      {name: '3', isUnique: true} as DMMF.Field,
    ]);
  });
});
