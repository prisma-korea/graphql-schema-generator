import {DMMF} from '@prisma/generator-helper';

const extractId = (model: DMMF.Model): DMMF.Field | undefined => {
  const {fields} = model;

  return fields.find(({isId}) => isId);
};

export default extractId;
