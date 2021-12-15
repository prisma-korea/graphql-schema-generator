import parse from './parse';
import transpile from './transpile';

import { removeWhiteSpaces } from './utils';

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
    posts Post[]
  }
`;

const graphqlSchema = `
  type Post {
    content: String
    id: Int
    published: Boolean
    author: User
  }

  type User {
    email: String
    id: Int
    name: String
    posts: [Post]
  }
`;

describe('transpile', () => {
  it('transpiles Prisma schema to graphql schema(SDL)', async () => {
    const model = await parse(prismaSchema);

    expect(removeWhiteSpaces(transpile(model)))
      .toBe(removeWhiteSpaces(graphqlSchema));
  });
});
