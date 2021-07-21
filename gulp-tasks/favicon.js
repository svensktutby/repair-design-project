'use strict';

module.exports = function ({ gulp, gp, path }) {

  const faviconConfig = require('.' + path.favicon.data);
  const del = require('del');
  const isProd = process.env.NODE_ENV === 'production';
  del(`${path.favicon.build}/*`);

  return gulp
        .src(path.favicon.src)
        .pipe(gp.favicons(faviconConfig.options))
        .pipe(gp.if(isProd,
          gp.filter(faviconConfig.options.faviconsProd),
          gp.filter(faviconConfig.options.faviconsDev)))
        .pipe(gulp.dest(path.favicon.build))
        .pipe(gp.debug({ title: 'favicon', showFiles: false }));
};
