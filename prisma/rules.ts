const {SDL} = require('../dist-cjs');

const rules = [
  {
    matcher: (field) => {
      const {name} = field;
      if (name === 'deletedAt') {
        return true;
      }

      return false;
    },
    transformer: (field) => {
      return {...field, name: 'isDeleted', type: SDL.Boolean};
    },
  },
];

module.exports = {rules};
