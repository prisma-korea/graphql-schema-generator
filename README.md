# GraphQL-Schema-Generator


[![CI](https://github.com/prisma-korea/graphql-schema-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/prisma-korea/graphql-schema-generator/actions/workflows/ci.yml)

[![codecov](https://codecov.io/gh/prisma-korea/graphql-schema-generator/branch/master/graph/badge.svg?token=H4VN0S3ES9)](https://codecov.io/gh/prisma-korea/graphql-schema-generator)


Generate `GraphQL schema(SDL)` from `Prisma schema` using Prisma generator.

## Contributing

Any contributions are welcomed. If you are interested, check out our [guidelines](https://github.com/prisma-korea/graphql-schema-generator/blob/master/CONTRIBUTING.md).

## Getting Started

1. Install this package in your project using:

```sh
// pnpm, npm, or yarn
pnpm install @prisma-korea/graphql-schema-generator
```

2. Add the generator to the schema.

```prisma
generator graphql {
  provider = "graphql-schema-generator"
}
```

3. Run `npx prisma generate`

4. Check `schema.graphql` in `./prisma/generated`.
