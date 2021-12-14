import { DMMF } from '@prisma/generator-helper';
import convertScalar from './scalarConverter';

const convertType = (field: DMMF.Field) => {
  const { kind } = field;

  if (kind === 'scalar') {
    return convertScalar(field);
  }

  // TODO
  return '';
};

export default convertType;
