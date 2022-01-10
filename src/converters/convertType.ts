import {DMMF} from '@prisma/generator-helper';

import type {Config} from '../generateGraphqlSchema';

import convertScalar from './convertScalar';

const convertType = (
  field: DMMF.Field,
  model: DMMF.Model,
  config?: Config,
): DMMF.Field => {
  const {kind} = field;

  if (kind === 'scalar') {
    return convertScalar(field, model, config);
  }

  // TODO
  return field;
};

export default convertType;
