import { DMMF } from '@prisma/generator-helper';

const formatType = (type: DMMF.Field['type'], option?: {[key: string]: boolean}) => {
  if (typeof type === 'string') {
    if (option?.isList) {
      return `[${type}]`;
    }

    return type;
  }

  // TODO: support other types in DMMF.Field['type']
  return type;
};

export default formatType;
