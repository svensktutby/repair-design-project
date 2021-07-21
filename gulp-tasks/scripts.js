'use strict';

module.exports = function ({ gulp, gp, path, browserSync }) {

  const webpackStream = require('webpack-stream');
  const webpackConfig = require('../webpack.config.js');
  const named = require('vinyl-named');
  const onError = require(path.message.error);
  const isProd = process.env.NODE_ENV === 'production';

  return gulp
        .src(path.scripts.src)
        .pipe(gp.plumber({ errorHandler: onError }))
        .pipe(named())
        .pipe(webpackStream(webpackConfig))
        .pipe(gp.if(isProd, gp.rename({ suffix: '.min' })))
        .pipe(gulp.dest(path.scripts.build))
        .on('end', browserSync.reload);
};
