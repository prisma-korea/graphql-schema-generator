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
};

module.exports = {rules};
