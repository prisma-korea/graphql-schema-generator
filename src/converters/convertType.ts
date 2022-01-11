import {DMMF} from '@prisma/generator-helper';
import convertScalar from './convertScalar';

const convertType = (field: DMMF.Field, model: DMMF.Model): DMMF.Field => {
  const {kind} = field;

  if (kind === 'scalar') {
    return convertScalar(field, model);
  }

  // TODO
  return field;
};

export default convertType;
