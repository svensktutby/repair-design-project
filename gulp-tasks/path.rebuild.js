'use strict';

// eslint-disable-next-line no-unused-vars
module.exports = function ({ path }) {

  return new Promise((resolve) => {

    delete require.cache[require.resolve('./path.js')];
    path = require('./path.js');
    resolve();
  });
};
