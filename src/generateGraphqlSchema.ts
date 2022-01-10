import parse from './parse';
import transpile from './transpile';

import type {Rule} from './converters/types';

export const description = `
"""
This file was generated by graphql-schema-generator which is
maintained by prisma-korea.

Do not make changes to this file directly.
Read more about in https://github.com/prisma-korea/graphql-schema-generator.
"""
`;
export type Config = {
  customRules?: Rule[];
  [key: string]: any;
};

const generateGraphqlSchema = async (
  source: string,
  config: Config,
): Promise<string> => {
  const model = await parse(source);

  const {createCRUD, ...rest} = config;

  const graphqlSchema =
    createCRUD === 'true'
      ? transpile(model, {
          ...rest,
          createQuery: 'true',
          createMutation: 'true',
        })
      : transpile(model, {
          ...rest,
          createQuery: 'false',
          createMutation: 'false',
        });

  return description + graphqlSchema;
};

export default generateGraphqlSchema;
