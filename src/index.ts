#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import {generatorHandler} from '@prisma/generator-helper';

import generateGraphqlSchema from './generateGraphqlSchema';

generatorHandler({
  onManifest() {
    return {
      defaultOutput: './generated',
      prettyName: 'GraphQL-Schema-Generator',
    };
  },
  async onGenerate(options) {
    const output = options.generator.output?.value;

    if (output) {
      const result = await generateGraphqlSchema(options.datamodel);

      try {
        await fs.promises.mkdir(output, {
          recursive: true,
        });

        await fs.promises.writeFile(
          path.join(output, 'schema.graphql'),
          result,
        );
      } catch (e) {
        console.error(
          'Error: unable to write files for GraphQL-Schema-Generator',
        );
        throw e;
      }
    } else {
      throw new Error('No output was specified for GraphQL-Schema-Generator');
    }
  },
});
