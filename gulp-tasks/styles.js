'use strict';

module.exports = function ({ gulp, gp, path, browserSync }) {

  const onError = require(path.message.error);
  const nodeSass = require('node-sass');
  const isProd = process.env.NODE_ENV === 'production';

  return gulp
        .src(path.styles.src, { sourcemaps: true })
        .pipe(gp.plumber({ errorHandler: onError }))
        .pipe(gp.sassGlob())
        .pipe(gp.sass(nodeSass)({ includePaths: [__dirname+'/', 'node_modules'] }))
        .pipe(gp.replace('../../fonts/', '../fonts/'))
        .pipe(gp.if(isProd, gp.groupCssMediaQueries()))
        .pipe(gp.autoprefixer({
            overrideBrowserslist: [
              'last 3 version',
              '> 1%',
              'ie 9'
            ],
            cascade: true,
            grid: true
          }))
        .pipe(gp.if(isProd, gp.cleanCss({ level: 2 })))
        .pipe(gp.if(isProd, gp.rename({ suffix: '.min' })))
        .pipe(gp.if(!isProd,
          gulp.dest(path.styles.build, { sourcemaps: true }),
          gulp.dest(path.styles.build, { sourcemaps: false })))
        .pipe(browserSync.stream());
};
