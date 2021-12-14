const formatModel = (name: string, fields: string[]) => `type ${name} {\n${fields.join('\n')}\n}\n`;

export default formatModel;
