import { getDMMF } from '@prisma/sdk';
import { DMMF } from '@prisma/generator-helper';

export type Models = {[name: string]: DMMF.Model}
export type Enums = {[name: string]: DMMF.DatamodelEnum['values']}

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

    return models.reduce((acc, model) => {
      const { name } = model;

      return { ...acc, [name]: model };
    }, {});
  }

  get enums(): Enums {
    const { enums } = this.dataModel;

    return enums.reduce((acc, cur) => {
      const { name, values } = cur;

      return { ...acc, [name]: values };
    }, {});
  }
}

const parse = async (prismaSchema: string): Promise<DataModel> => {
  const dmmf = await getDMMF({ datamodel: prismaSchema });

  return new DataModel(dmmf.datamodel);
};

export default parse;
