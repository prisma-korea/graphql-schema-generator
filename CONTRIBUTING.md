# Contributing to GraphQL-Schema-Generator

Thanks for taking the time to contribute!

The following is a set of guidelines for contributing to GraphQL-Schema-Generator. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Architecture

GraphQL-Schema-Generator relies on [Prisma Generator](https://prismaio.notion.site/Prisma-Generators-a2cdf262207a4e9dbcd0e362dfac8dc0).

![Architecture](https://user-images.githubusercontent.com/61503739/145976430-810a5504-e8a3-4c81-8633-e1b3c3d7440f.png)
`1. Parse Schema, 2. Provide DMMF` is done by `@prisma/sdk` and `3. parse.ts, 4. transpile.ts` is from this codebase.

Note that actual parsing is done in `@prisma/sdk`, but we don't use the result of parser directly. From DMMF, we build our own `DataModel` which our transpiler is consuming. That's why `parser.ts` is named 'parser'.

## development

Currently, there're three ways to see how changes you made affects the output.

1. Write a test about it (Ideally, it should happen before changes in code).
2. Run `pnpm dev` to see output of example in `schema.prisma`. (You can try other file)
3. Remove `skip` in `src/diff/diff.test.ts` and see `diff` of previous and current output. Using with jest watch mode, you can get instant feedback about changes you made.

## Testing

Testing is the most important part of your contribution. Every pull request, except for refactoring or simple cases such as typo correction, and documentation, should contain tests that describe what you did in the PR.

To run test, use the following command.

```shell
pnpm test
```

All test file should be adjacent to the target file. (No folders like `/test`)

It is most ideal that the test code is written well as presented in the guide, **but if you do not, write an explanation with sufficient examples. We will help you fill out the test.**

## PR / Issue

PR and issue should be minimal as possible.

## Feature

Keep in mind that each test should act like documentation.

## Bug Report / Fix

1. Write a failing test that describe bug. (If you stop here, it's a bug report.)
2. Write a code that passes the test. (You solve it!)

## Refactoring

If target code and test code are both modified, it is not refactoring.

## Etc

Other contributions such as documentation is always welcomed. We will make guild about this in the future.
