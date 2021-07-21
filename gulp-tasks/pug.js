'use strict';

module.exports = function ({ gulp, gp, path, browserSync }) {

  const onError = require(path.message.error);

  return gulp
        .src(path.pug.src)
        .pipe(gp.plumber({ errorHandler: onError }))
        .pipe(gp.pug({ pretty: true }))
        .pipe(gp.debug({ title: 'pug:', showFiles: true }))
        .pipe(gulp.dest(path.pug.build))
        .on('end', browserSync.reload);
};
