import formatScalar from './formatScalar';

describe('formatScalar', () => {
  it('formats the whole scalar', () => {
    expect(formatScalar('User')).toBe('scalar User\n');
  });
});
