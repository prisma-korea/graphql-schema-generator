import { DMMF } from '@prisma/generator-helper';

import convertType from './convertType';
import convertScalar from './convertScalar';

jest.mock('./convertScalar');

describe('typeConverter', () => {
  it('calls other converters by field kind', () => {
    const field = { kind: 'scalar' };

    convertType(field as DMMF.Field);

    expect(convertScalar).toBeCalledWith(field);
  });
});
