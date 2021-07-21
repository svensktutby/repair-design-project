'use strict';

module.exports = function ({ gulp, gp, path }) {

  const through2 = require('through2');
  const onError = require(path.message.error);

  function isLinty(file) {
    // check if a file has any errors or warnings
    return file.eslint != null && (file.eslint.warningCount > 0 || file.eslint.errorCount > 0);
  }

  function uncache(cacheName) {
    // create a stream that removes files from cache
    return through2.obj(function (file, enc, cb) {
      if (gp.cached.caches[cacheName]) {
        delete gp.cached.caches[cacheName][file.path];
      }
      cb(null, file);
    });
  }

  return gulp
        .src(path.scripts.lint)
        .pipe(gp.plumber({ errorHandler: onError }))
        .pipe(gp.cached('eslint-cache'))
        // only uncached and changed files past this point
        .pipe(gp.eslint())
        .pipe(gp.eslint.format())
        .pipe(gp.eslint.failAfterError())
        // if a file has errors/warnings ("linty") uncache it
        .pipe(gp.if(isLinty, uncache('eslint-cache')))
        .pipe(gp.debug({ title: 'eslint:lint:', showFiles: false }));
};
