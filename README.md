# GraphQL-Schema-Generator

Generate `GraphQL schema(SDL)` from `Prisma schema` using Prisma generator.

## Contributing
Any contributions are welcomed. If you are interested, check out our [out guildline](https://github.com/prisma-korea/graphql-schema-generator/blob/master/CONTRIBUTING.md).

## Getting Started

1. Install this package using:

```shell
pnpm install @prisma-korea/graphql-schema-generator
```

2. Add the generator to the schema.

```prisma
generator graphql {
  provider = "node @prisma-korea/graphql-schema-generator"
}
```

3. Check `schema.graphql` in `./prisma/schema`.
