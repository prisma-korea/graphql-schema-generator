import fieldFormatter from './fieldFormatter';
import typeFormatter from './typeFormatter';

jest.mock('./typeFormatter');

describe('fieldFormatter', () => {
  it('calls type formatter with options', () => {
    fieldFormatter({ name: 'name', type: 'type', typeOption: { isList: true } });

    expect(typeFormatter).toBeCalledWith('type', { isList: true });
  });

  it('formats the whole field', () => {
    (typeFormatter as jest.Mock).mockImplementation(() => 'type');

    expect(fieldFormatter({ name: 'name', type: 'type' })).toBe('\tname: type');
  });
});
