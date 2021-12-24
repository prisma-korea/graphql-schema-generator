import parse from './parse';
import transpile from './transpile';
import generateGraphqlSchema, {description} from './generateGraphqlSchema';

jest.mock('./transpile');

describe('generateGraphqlSchema', () => {
  it.each([
    [{createCRUD: 'true'}, {createQuery: 'true', createMutation: 'true'}],
    [{createCRUD: 'not true'}, {createQuery: 'false', createMutation: 'false'}],
  ])(
    'calls transpiler with model and converted config',
    async (originalConfig, convertedConfig) => {
      const prismaSchema = /* Prisma */ `
        model Post {
          id    Int      @id
          content1  Bytes
        }
      `;

      await generateGraphqlSchema(prismaSchema, originalConfig);

      const model = await parse(prismaSchema);
      expect(transpile).toBeCalledWith(model, convertedConfig);
    },
  );

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
