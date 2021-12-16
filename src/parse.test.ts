import parse from './parse';

const prismaSchema = /* Prisma */ `
  enum Role {
    USER
    ADMIN
  }

  model Post {
    authorId  Int?
    content   String?
    id        Int     @default(autoincrement()) @id
    published Boolean @default(false)
    author    User?   @relation(fields: [authorId], references: [id])
  }
  
  model User {
    email String  @unique
    id    Int     @default(autoincrement()) @id
    name  String?
    posts Post[]
  }
`;

describe('DataModel', () => {
  it('returns name of models', async () => {
    const dataModel = await parse(prismaSchema);

    expect(dataModel.names).toEqual(['Post', 'User']);
  });

  it('returns detail model data that can be accessed with name', async () => {
    const dataModel = await parse(prismaSchema);

    const { Post, User } = dataModel.models;

    expect(Object.keys(Post)).toEqual(
      ['name', 'dbName', 'fields', 'isGenerated', 'primaryKey', 'uniqueFields', 'uniqueIndexes'],
    );

    expect(Object.keys(User)).toEqual(
      ['name', 'dbName', 'fields', 'isGenerated', 'primaryKey', 'uniqueFields', 'uniqueIndexes'],
    );
  });

  it('returns enums', async () => {
    const dataModel = await parse(prismaSchema);

    expect(dataModel.enums).toEqual(
      {
        Role: [
          { name: 'USER', dbName: null },
          { name: 'ADMIN', dbName: null },
        ],
      },
    );
  });
});
