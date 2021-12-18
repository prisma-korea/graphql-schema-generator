import {DMMF} from '@prisma/generator-helper';

const formatField = (field: DMMF.Field): string => {
  const {name, type} = field;

  return `\t${name}: ${type}`;
};

export default formatField;
