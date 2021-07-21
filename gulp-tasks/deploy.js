'use strict';

module.exports = function () {
  
  const ghPages = require('gh-pages');
  const path = require('path');

  return ghPages.publish(path.join(process.cwd(), './build'));
};
