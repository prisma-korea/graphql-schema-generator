import { DMMF } from '@prisma/generator-helper';

import convertScalar from './convertScalar';

const convertType = (field: DMMF.Field) => {
  const { kind } = field;

  if (kind === 'scalar') {
    return convertScalar(field);
  }

  // TODO
  return field.type;
};

export default convertType;
