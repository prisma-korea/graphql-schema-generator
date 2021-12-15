import format from './formatType';

describe('typeFormatter', () => {
  it('does nothing with normal type', () => {
    expect(format('User', {})).toBe('User');
  });

  it('wraps the list type in square brackets.', () => {
    expect(format('User', { isList: true })).toBe('[User]');
  });
});
