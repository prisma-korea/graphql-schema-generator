import { DMMF } from '@prisma/generator-helper';

import convertType from './typeConverter';
import convertScalar from './scalarConverter';

jest.mock('./scalarConverter');

describe('typeConverter', () => {
  it('calls other converters by field kind', () => {
    const field = { kind: 'scalar' };

    convertType(field as DMMF.Field);

    expect(convertScalar).toBeCalledWith(field);
  });
});
