const {SDL} = require('../dist-cjs');

const rules = {
  beforeAddingTypeModifiers: [
    {
      matcher: (field) => {
        const {name} = field;

        if (name === 'deletedAt') {
          return true;
        }

        return false;
      },
      transformer: (field) => {
        return {
          ...field,
          name: 'isDeleted',
          type: SDL.Boolean,
        };
      },
    },
    {
      matcher: (field) => {
        const {type} = field;

        if (type === 'ChannelType') {
          return true;
        }

        return false;
      },
      transformer: () => {
        throw null;
      },
    },
  ],
  afterAddingTypeModifiers: [
    {
      matcher: (field) => {
        const {type} = field;

        if (/\[(\w+)!]!/gm.exec(type)) {
          return true;
        }

        return false;
      },
      transformer: (field) => {
        const {type} = field;

        const match = /\[(\w+)!]!/gm.exec(type);

        if (!match) {
          return field;
        }

        const [_, typeWithoutModifiers] = match;

        return {...field, type: `[${typeWithoutModifiers}]`};
      },
    },
  ],
};

module.exports = {rules};
