import {DMMF} from '@prisma/generator-helper';

import store from './store';

describe('store', () => {
  it('adds id field', () => {
    const field1 = {name: 'name1', isId: true} as DMMF.Field;
    const field2 = {name: 'name2', isId: true} as DMMF.Field;

    store.add({model: 'User1', field: field1});
    store.add({model: 'User2', field: field2});

    expect(store.ids).toEqual({
      User1: {name: 'name1', isId: true},
      User2: {name: 'name2', isId: true},
    });
  });
});
