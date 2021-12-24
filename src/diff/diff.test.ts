import * as fs from 'fs';

import {diff} from 'jest-diff';
import generateGraphqlSchema from '../generateGraphqlSchema';

// eslint-disable-next-line jest/no-disabled-tests
it.skip('diff', async () => {
  const sourcePath = './prisma/schema.prisma';
  const cachePath = './src/diff/previous.cache';

  const buffer = fs.readFileSync(sourcePath);

  const current = await generateGraphqlSchema(buffer.toString(), {
    createCRUD: 'true',
  });

  const previous = fs.readFileSync(cachePath).toString();

  // eslint-disable-next-line no-console
  console.log(diff(previous, current));

  fs.writeFileSync(cachePath, current);
});
