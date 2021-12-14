import { DMMF } from '@prisma/generator-helper';

import formatType from './typeFormatter';

type Option = {[key: string]: boolean}

type Prop = {
  name: string,
  type: DMMF.Field['type'],
  typeOption?: Option
}

const formatField = ({
  name, type, typeOption,
}: Prop) => {
  const formattedType = formatType(type, typeOption);

  return `\t${name}: ${formattedType}`;
};

export default formatField;
