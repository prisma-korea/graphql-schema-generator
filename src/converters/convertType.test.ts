import {DMMF} from '@prisma/generator-helper';
import convertScalar from './convertScalar';
import convertType from './convertType';

import type {Config} from '../generateGraphqlSchema';

jest.mock('./convertScalar');

describe('typeConverter', () => {
  it('calls other converters by field kind', () => {
    const field = {kind: 'scalar'} as DMMF.Field;
    const model = {} as DMMF.Model;
    const config = {} as Config;

    convertType(field, model, config);

    expect(convertScalar).toBeCalledWith(field, model, config);
  });
});
