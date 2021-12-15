import * as fs from 'fs';
import * as path from 'path';

import { generatorHandler } from '@prisma/generator-helper';

import parse from './parse';
import transpile from './transpile';

generatorHandler({
  onManifest() {
    return {
      defaultOutput: './schema',
      prettyName: 'GraphQL-Schema-Generator',
    };
  },
  async onGenerate(options) {
    const output = options.generator.output?.value;

    if (output) {
      const model = await parse(options.datamodel);
      const graphqlSchema = transpile(model);

      try {
        await fs.promises.mkdir(output, {
          recursive: true,
        });

        await fs.promises.writeFile(
          path.join(output, 'schema.graphql'),
          graphqlSchema,
        );
      } catch (e) {
        console.error('Error: unable to write files for GraphQL-Schema-Generator');
        throw e;
      }
    } else {
      throw new Error('No output was specified for GraphQL-Schema-Generator');
    }
  },
});
