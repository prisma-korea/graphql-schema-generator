import formatDefinition from './formatDefinition';

describe('formatDefinition', () => {
  it('formats the whole definition', () => {
    const type = 'enum';
    const name = 'Model1';
    const fields = ['name1: type1', 'name2: type2'];

    expect(formatDefinition({type, name, fields})).toBe(
      'enum Model1 {\nname1: type1\nname2: type2\n}\n',
    );
  });
});
