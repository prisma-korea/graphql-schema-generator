import { DMMF } from '@prisma/generator-helper';

const addTypeModifilers = (field: DMMF.Field) => {
  const { isList, isRequired } = field;

  if (isList) {
    return `[${field.type}]`;
  }

  if (isRequired) {
    return `${field.type}!`;
  }

  return field.type;
};

export default addTypeModifilers;
