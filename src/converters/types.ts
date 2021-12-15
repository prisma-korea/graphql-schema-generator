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

enum Scalar {
  ByteArray = 'ByteArray',
  DateTime = 'DateTime',
}

type Rule = {
  matcher: (field: DMMF.Field) => boolean
  transformer: (field: DMMF.Field, type: DMMF.Field['type']) => string
}

export {
  GraphQL, Prisma, Scalar, Rule,
};
