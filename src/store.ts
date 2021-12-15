type T = {
  scalars: Set<string>
}

class Store {
  private data: T;

  constructor() {
    this.data = { scalars: new Set<string>() };
  }

  get scalars(): string[] {
    const set = this.data.scalars;

    return Array.from(set.values());
  }

  addScalar(s: string) {
    this.data.scalars.add(s);
  }
}

const store = new Store();

export default store;
