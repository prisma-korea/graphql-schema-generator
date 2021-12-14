import { getDMMF } from '@prisma/sdk';
import { DMMF } from '@prisma/generator-helper';

export type Models = {[name: string]: DMMF.Model}

export class DataModel {
  dataModel: DMMF.Datamodel;

  constructor(dataModel: DMMF.Datamodel) {
    this.dataModel = dataModel;
  }

  get names(): string[] {
    const { models } = this.dataModel;

    return models.map((model) => model.name);
  }

  get models(): Models {
    const { models } = this.dataModel;

    return models.reduce((ret, model) => {
      const { name } = model;

      return { ...ret, [name]: model };
    }, {});
  }
}

const parse = async (prismaSchema: string): Promise<DataModel> => {
  const dmmf = await getDMMF({ datamodel: prismaSchema });

  return new DataModel(dmmf.datamodel);
};

export default parse;
