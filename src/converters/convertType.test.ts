import {DMMF} from '@prisma/generator-helper';
import convertScalar from './convertScalar';
import convertType from './convertType';

jest.mock('./convertScalar');

describe('typeConverter', () => {
  it('calls other converters by field kind', () => {
    const field = {kind: 'scalar'} as DMMF.Field;
    const model = {} as DMMF.Model;

    convertType(field, model);

    expect(convertScalar).toBeCalledWith(field, model);
  });
});
