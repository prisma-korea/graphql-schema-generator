type DefinitionType = 'type' | 'scalar' | 'enum'

const formatModel = (
  { type, name, fields }: {type: DefinitionType, name: string, fields: string[]},
) => `${type} ${name} {\n${fields.join('\n')}\n}\n`;

export default formatModel;
