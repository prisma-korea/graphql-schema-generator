import parse from './parse';
import {removeWhiteSpaces} from './utils';
import transpile from './transpile';

describe('transpile', () => {
  it('adds scalars', async () => {
    const prismaSchema = /* Prisma */ `
      model Post {
        id    Int      @id
        date  DateTime
        content1  Bytes?
        content2  Bytes
      }
    `;

    const graphqlSchema = `
      scalar DateTime
      scalar ByteArray

      type Post {
        id: ID!
        date: DateTime!
        content1: ByteArray
        content2: ByteArray!
      }
    `;

    const model = await parse(prismaSchema);

    expect(removeWhiteSpaces(transpile(model))).toBe(
      removeWhiteSpaces(graphqlSchema),
    );
  });

  it('adds enums', async () => {
    const prismaSchema = /* Prisma */ `
      enum Role {
        USER
        ADMIN
      }
      enum Gender {
        male
        female
      }
    `;

    const graphqlSchema = `
      enum Role {
        USER
        ADMIN
      }
      enum Gender {
        male
        female
      }
    `;

    const model = await parse(prismaSchema);

    expect(removeWhiteSpaces(transpile(model))).toBe(
      removeWhiteSpaces(graphqlSchema),
    );
  });

  it('adds models', async () => {
    const prismaSchema = /* Prisma */ `
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
        detail String?
        posts Post[]
      }
    `;

    const graphqlSchema = `
      type Post {
        content: String
        id: ID!
        published: Boolean!
        author: User
      }

      type User {
        email: String!
        id: ID!
        name: String
        detail: String
        posts: [Post!]!
      }
    `;

    const model = await parse(prismaSchema);

    expect(removeWhiteSpaces(transpile(model))).toBe(
      removeWhiteSpaces(graphqlSchema),
    );
  });
});
