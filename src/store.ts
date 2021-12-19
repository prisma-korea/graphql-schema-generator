import {DMMF} from '@prisma/generator-helper';

type IDs = {[model: string]: DMMF.Field | undefined};

type T = {
  ids: IDs;
};

class Store {
  private data: T;

  constructor() {
    this.data = {ids: {}};
  }

  get ids(): IDs {
    return this.data.ids;
  }

  add({model, field}: {model: string; field: DMMF.Field | undefined}): void {
    const previous = this.data.ids;

    // eslint-disable-next-line no-console
    console.assert(previous[model] === undefined);

    this.data.ids = {...previous, [model]: field};
  }

  reset(): void {
    this.data = {ids: {}};
  }
}

const store = new Store();

export default store;
