import {PSL, Scalar} from '../converters/types';
import extractScalars from './extractScalars';
import {DataModel} from '../parse';

describe('extractScalars', () => {
  it('extracts DateTime, and ByteArray from DateTime, Bytes', () => {
    const dataModel = {
      names: ['name1', 'name2'],
      models: {
        name1: {
          fields: [
            {
              type: PSL.DateTime,
            },
          ],
        },

        name2: {
          fields: [
            {
              type: PSL.Bytes,
            },
          ],
        },
      },
    };

    expect(extractScalars(dataModel as unknown as DataModel)).toEqual([
      Scalar.DateTime,
      Scalar.ByteArray,
    ]);
  });

  it('igores duplicates', () => {
    const dataModel = {
      names: ['name1'],
      models: {
        name1: {
          fields: [
            {
              type: PSL.DateTime,
            },
            {
              type: PSL.DateTime,
            },
          ],
        },
      },
    };

    expect(extractScalars(dataModel as unknown as DataModel)).toEqual([
      Scalar.DateTime,
    ]);
  });
});
