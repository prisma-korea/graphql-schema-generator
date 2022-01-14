# GraphQL-Schema-Generator for Prisma


[![CI](https://github.com/prisma-korea/graphql-schema-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/prisma-korea/graphql-schema-generator/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/prisma-korea/graphql-schema-generator/branch/master/graph/badge.svg?token=H4VN0S3ES9)](https://codecov.io/gh/prisma-korea/graphql-schema-generator)


Generate **GraphQL schema (SDL)** from **Prisma schema** using a custom Prisma generator.

## Getting Started

1. Install this package in your project using:

```sh
// pnpm, npm, or yarn
pnpm install @prisma-korea/graphql-schema-generator
```

2. Add the generator to the `schema.prisma`:

```prisma
generator graphql {
  provider = "graphql-schema-generator"
  createCRUD = "true"
  # output = "./generated" This is default path.
}
```

3. Run `npx prisma generate` to run the generator

4. Check `schema.graphql` in `./prisma/generated` 🎉

## Custom Rules
You can apply custom rules to manipulate behavior. [(Some use cases)](https://github.com/prisma-korea/graphql-schema-generator/issues/34). See [this](https://github.com/prisma-korea/graphql-schema-generator/tree/master/prisma) for example.

> Example dir structure

  ![image](https://user-images.githubusercontent.com/27461460/149453371-3991e868-ba43-4cf4-9d2a-c03e66c6eb75.png)

> Example usage

  ```
  generator graphql {
    provider = "graphql-schema-generator"
    output   = "../src/schemas"
    createCRUD = "true"
    customRules = "../prisma/rules.ts"
  }
  ```

> Example [rules code](https://github.com/prisma-korea/graphql-schema-generator/issues/15#issuecomment-1012775364)

## Contributing

Any contributions are welcome. If you are interested, check out our [guidelines](https://github.com/prisma-korea/graphql-schema-generator/blob/master/CONTRIBUTING.md).
