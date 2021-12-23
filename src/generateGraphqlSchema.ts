import parse from './parse';
import transpile from './transpile';

export const description = `
"""
This file was generated by graphql-schema-generator which is
maintained by prisma-korea.

Do not make changes to this file directly.
Read more about in https://github.com/prisma-korea/graphql-schema-generator.
"""
`;

const generateGraphqlSchema = async (source: string): Promise<string> => {
  const model = await parse(source);
  const graphqlSchema = transpile(model);

  return description + graphqlSchema;
};

export default generateGraphqlSchema;
