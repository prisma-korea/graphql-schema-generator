# GraphQL-Schema-Generator

Generate `GraphQL schema(SDL)` from `Prisma schema` using Prisma generator.

## Contributing

Any contributions are welcomed. If you are interested, check out our [out guildline](https://github.com/prisma-korea/graphql-schema-generator/blob/master/CONTRIBUTING.md).

## Getting Started

**Important**

Currently, using `@prisma-korea/graphql-schema-generator` as package is not working. We will fix this soon. Until then, you can copy & past your `schema.prisma` in `prisma` folder in this project, and run `pnpm dev` to see how it works

---

1. Install this package in your project using:

```shell
pnpm install @prisma-korea/graphql-schema-generator
```

2. Add the generator to the schema.

```prisma
generator graphql {
  provider = "node @prisma-korea/graphql-schema-generator"
}
```

3. Run `npx prisma generate`

4. Check `schema.graphql` in `./prisma/schema`.
