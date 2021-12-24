import {Definition} from '../converters/types';

const formatModel = ({
  type,
  name,
  fields,
}: {
  type: Definition;
  name: string;
  fields: string[];
}): string => `${type} ${name} {\n${fields.join('\n')}\n}\n`;

export default formatModel;
