import {DMMF} from '@prisma/generator-helper';
import fieldFormatter from './formatField';

describe('fieldFormatter', () => {
  it('formats the whole field', () => {
    expect(fieldFormatter({name: 'name', type: 'type'} as DMMF.Field)).toBe(
      '\tname: type',
    );
  });
});
