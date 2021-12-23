import generateGraphqlSchema, {description} from './generateGraphqlSchema';

describe('generateGraphqlSchema', () => {
  it('adds description', async () => {
    const prismaSchema = /* Prisma */ `
      model Post {
        id    Int      @id
        content1  Bytes
      }
    `;

    const result = await generateGraphqlSchema(prismaSchema);

    expect(result).toEqual(expect.stringContaining(description));
  });
});
