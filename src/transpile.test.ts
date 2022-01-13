import transpile from './transpile';
import parse from './parse';
import {CustomRules, SDL} from './converters/types';

import {sdl} from './utils';

describe('transpile', () => {
  it('can be controlled with custom rules', async () => {
    const prismaSchema = /* Prisma */ `
        model User {
          id      Int    @id
          content Json
        }
  
        model Post {
          email    String  @unique
          password  String
        }
      `;

    const graphqlSchema = sdl(`
        type User {
          id: String!
          content: String!
        }
  
        type Post {
          email: String!
        }
      `);

    const customRules: CustomRules = {
      beforeAddingTypeModifiers: [
        {
          matcher: (field) => {
            const {name} = field;

            if (name === 'password') {
              return true;
            }

            return false;
          },
          transformer: () => {
            throw null;
          },
        },
        {
          matcher: (field) => {
            const {type} = field;

            if (type === SDL.ID) {
              return true;
            }

            return false;
          },
          transformer: (field) => ({...field, type: SDL.String}),
        },
      ],
    };

    const model = await parse(prismaSchema);
    expect(transpile(model, {customRules})).toBe(graphqlSchema);
  });

  it('adds queries', async () => {
    const prismaSchema = /* Prisma */ `
      model User {
        id      Int    @id
        content String
      }

      model Post {
        email    String  @unique
        content  String
      }
    `;

    const graphqlSchema = sdl(`
      type Query {
        user(id: ID!): User
        users: [User!]!
        post(email: ID!): Post
        posts: [Post!]!
      }

      type User {
        id: ID!
        content: String!
      }

      type Post {
        email: ID!
        content: String!
      }
    `);

    const model = await parse(prismaSchema);

    expect(transpile(model, {createQuery: 'true'})).toBe(graphqlSchema);
  });

  it('adds mutations', async () => {
    const prismaSchema = /* Prisma */ `
      model User {
        id      Int    @id
        content String
        name    String?
      }

      model Post {
        email    String  @unique
        content  String
      }
    `;

    const graphqlSchema = sdl(`
      input UserCreateInput {
        content: String!
        name: String
      }
  
      input UserUpdateInput {
        content: String
        name: String
      }

      input PostCreateInput {
        content: String!
      }
  
      input PostUpdateInput {
        content: String
      }

      type Mutation {
        createUser(user: UserCreateInput!): User
        updateUser(user: UserUpdateInput!): User
        deleteUser(id: ID!): User
        createPost(post: PostCreateInput!): Post
        updatePost(post: PostUpdateInput!): Post
        deletePost(email: ID!): Post
      }

      type User {
        id: ID!
        content: String!
        name: String
      }

      type Post {
        email: ID!
        content: String!
      }
    `);

    const model = await parse(prismaSchema);

    expect(transpile(model, {createMutation: 'true'})).toBe(graphqlSchema);
  });

  it('adds scalars', async () => {
    const prismaSchema = /* Prisma */ `
      model Post {
        id    Int      @id
        date  DateTime
        content1  Bytes?
        content2  Bytes
      }
    `;

    const graphqlSchema = sdl(`
      scalar DateTime
      scalar ByteArray

      type Post {
        id: ID!
        date: DateTime!
        content1: ByteArray
        content2: ByteArray!
      }
    `);

    const model = await parse(prismaSchema);

    expect(transpile(model)).toBe(graphqlSchema);
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

    const graphqlSchema = sdl(`
      enum Role {
        USER
        ADMIN
      }
      enum Gender {
        male
        female
      }
    `);

    const model = await parse(prismaSchema);

    expect(transpile(model)).toBe(graphqlSchema);
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

    const graphqlSchema = sdl(`
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
    `);

    const model = await parse(prismaSchema);

    expect(transpile(model)).toBe(graphqlSchema);
  });
});
