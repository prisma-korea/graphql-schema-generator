import {DMMF} from '@prisma/generator-helper';

const extractUniques = (model: DMMF.Model): DMMF.Field[] => {
  return model.fields.filter(({isUnique}) => isUnique);
};

export default extractUniques;
