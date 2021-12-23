import parse from './parse';
import transpile from './transpile';
import generateGraphqlSchema, {description} from './generateGraphqlSchema';

jest.mock('./transpile');

describe('generateGraphqlSchema', () => {
  it('calls transpiler with model and config', async () => {
    const prismaSchema = /* Prisma */ `
      model Post {
        id    Int      @id
        content1  Bytes
      }
    `;

    const config = {createQuery: 'false'};
    await generateGraphqlSchema(prismaSchema, config);

    const model = await parse(prismaSchema);
    expect(transpile).toBeCalledWith(model, config);
  });

  it('adds description', async () => {
    const prismaSchema = /* Prisma */ `
      model Post {
        id    Int      @id
        content1  Bytes
      }
    `;

    const result = await generateGraphqlSchema(prismaSchema, {});

    expect(result).toEqual(expect.stringContaining(description));
  });
});
