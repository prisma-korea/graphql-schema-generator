import {DMMF} from '@prisma/generator-helper';

enum SDL {
  ID = 'ID',
  Int = 'Int',
  Float = 'Float',
  String = 'String',
  Boolean = 'Boolean',
}

enum PSL {
  Int = 'Int',
  Float = 'Float',
  String = 'String',
  BigInt = 'BigInt',
  Boolean = 'Boolean',
  Decimal = 'Decimal',
  DateTime = 'DateTime',
  Json = 'Json',
  Bytes = 'Bytes',
  Unsupported = 'Unsupported',
}

enum Scalar {
  ByteArray = 'ByteArray',
  DateTime = 'DateTime',
}

enum ReservedName {
  Query = 'Query',
}

enum Definition {
  type = 'type',
  enum = 'enum',
}

type Rule = {
  matcher: (field: DMMF.Field, model: DMMF.Model) => boolean;
  transformer: (field: DMMF.Field, type: DMMF.Field['type']) => string;
};

export type {Rule};

export {SDL, PSL, Scalar, ReservedName, Definition};
