import { DMMF } from '@prisma/generator-helper';

enum GraphQL {
  ID = 'ID',
  Int = 'Int',
  Float = 'Float',
  String = 'String',
  Boolean = 'Boolean',
}

enum Prisma {
  Int = 'Int',
  Float = 'Float',
  String = 'String',
  BigInt = 'BigInt',
  Boolean = 'Boolean',
  Decimal = 'Decimal',
  DateTime = 'DateTime',
  Json = 'Json',
  Bytes = 'Bytes',
  Unsupported = 'Unsupported'
}

type Rule = {
  matcher: (field: DMMF.Field) => boolean
  transformer: (field?: DMMF.Field) => string
}

export { GraphQL, Prisma, Rule };
