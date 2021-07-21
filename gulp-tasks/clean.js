'use strict';

module.exports = function ({ path }) {

  const del = require('del');

  return del([
    `${path.dir.build}/**`,
    `${path.dir.tmp}/**`
  ]);
};
