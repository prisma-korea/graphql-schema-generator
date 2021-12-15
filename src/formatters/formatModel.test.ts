import formatModel from './formatModel';

describe('formatModel', () => {
  it('formats the whole model', () => {
    const name = 'Model1';
    const fields = ['name1: type1', 'name2: type2'];

    expect(formatModel(name, fields)).toBe('type Model1 {\nname1: type1\nname2: type2\n}\n');
  });
});
