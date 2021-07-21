'use strict';

module.exports = function ({ path, browserSync }) {

  return browserSync.init({
    open: false,
    notify: false,
    server: {
      port: 3000,
      baseDir: path.dir.build
    }
  });
};
