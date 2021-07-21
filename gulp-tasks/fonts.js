'use strict';

module.exports = function ({ gulp, gp, path, browserSync }) {

  return gulp
        .src(path.fonts.src)
        .pipe(gp.changed(path.fonts.build))
        .pipe(gp.debug({ title: 'fonts:', showFiles: false }))
        .pipe(gulp.dest(path.fonts.build))
        .on('end', browserSync.reload);
};
