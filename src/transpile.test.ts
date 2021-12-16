import parse from './parse';
import transpile from './transpile';

import { removeWhiteSpaces } from './utils';

const prismaSchema = /* Prisma */ `
  enum Role {
    USER
    ADMIN
  }

  model Post {
    authorId  Int?
    content   Bytes?
    id        Int     @default(autoincrement()) @id
    published Boolean @default(false)
    author    User?   @relation(fields: [authorId], references: [id])
  }
  
  model User {
    email String  @unique
    id    Int     @default(autoincrement()) @id
    name  String?
    detail Bytes?
    posts Post[]
  }
`;

const graphqlSchema = `
  scalar ByteArray

  enum Role {
    USER
    ADMIN
  }

  type Post {
    content: ByteArray
    id: ID!
    published: Boolean!
    author: User
  }

  type User {
    email: String!
    id: ID!
    name: String
    detail: ByteArray
    posts: [Post!]!
  }
`;

describe('transpile', () => {
  it('transpiles Prisma schema to graphql schema(SDL)', async () => {
    const model = await parse(prismaSchema);

    expect(removeWhiteSpaces(transpile(model)))
      .toBe(removeWhiteSpaces(graphqlSchema));
  });
});
