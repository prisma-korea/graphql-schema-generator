import {DMMF} from '@prisma/generator-helper';
import convertScalar from './convertScalar';

const convertType = (
  field: DMMF.Field,
  model: DMMF.Model,
): string | DMMF.SchemaEnum | DMMF.OutputType | DMMF.SchemaArg => {
  const {kind} = field;

  if (kind === 'scalar') {
    return convertScalar(field, model);
  }

  // TODO
  return field.type;
};

export default convertType;
