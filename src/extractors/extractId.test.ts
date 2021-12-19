import {DMMF} from '@prisma/generator-helper';

import extractId from './extractId';

describe('extractId', () => {
  it('extracts field which is @id', () => {
    const model = {
      fields: [
        {
          name: 'name2',
          isId: false,
        },
        {
          name: 'name1',
          isId: true,
        },
      ],
    };

    expect(extractId(model as DMMF.Model)).toEqual({
      name: 'name1',
      isId: true,
    });
  });
});
