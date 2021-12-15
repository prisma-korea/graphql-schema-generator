type T = {
  scalars: string[]
}

class Store {
  data: T;

  constructor() {
    this.data = { scalars: [] };
  }

  get scalars(): string[] {
    return this.data.scalars;
  }

  addScalar(s: string) {
    const previous = this.data.scalars;

    this.data.scalars = [...previous, s];
  }
}

const store = new Store();

export default store;
