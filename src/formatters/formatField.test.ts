import fieldFormatter from './formatField';
import formatType from './formatType';

jest.mock('./formatType');

describe('fieldFormatter', () => {
  it('calls type formatter with options', () => {
    fieldFormatter({ name: 'name', type: 'type', typeOption: { isList: true } });

    expect(formatType).toBeCalledWith('type', { isList: true });
  });

  it('formats the whole field', () => {
    (formatType as jest.Mock).mockImplementation(() => 'type');

    expect(fieldFormatter({ name: 'name', type: 'type' })).toBe('\tname: type');
  });
});
