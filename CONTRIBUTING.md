# Contributing to GraphQL-Schema-Generator

Thanks for taking the time to contribute!

The following is a set of guidelines for contributing to GraphQL-Schema-Generator. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Architecture

GraphQL-Schema-Generator rely on [Prisma Generator](https://prismaio.notion.site/Prisma-Generators-a2cdf262207a4e9dbcd0e362dfac8dc0).

## Testing

Testing is the most important part of your contribution. Every pull request, except for refactoring or simple cases such as typo correction, and documentation, should contain tests that describe what you did in the PR. 

To run test, use the following command.
```shell
pnpm test
```

All test file should be adjacent to the target file. (No folders like `/test`)
Keep in mind that each test should act like documentation.
