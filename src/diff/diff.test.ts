import * as fs from 'fs';
import { diff } from 'jest-diff';

import parse from '../parse';
import transpile from '../transpile';

it.skip('diff', async () => {
  const sourcePath = './prisma/schema.prisma';
  const cachePath = 'src/diff/previous.cache';

  const buffer = fs.readFileSync(sourcePath);
  const model = await parse(buffer.toString());
  const current = transpile(model);

  const previous = fs.readFileSync(cachePath).toString();

  // eslint-disable-next-line no-console
  console.log(diff(previous, current));

  fs.writeFileSync(cachePath, current);
});
