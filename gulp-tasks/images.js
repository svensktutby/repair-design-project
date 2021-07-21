'use strict';

module.exports = function ({ gulp, gp, path, browserSync }) {

  const pngquant = require('imagemin-pngquant');
  const mozjpeg = require('imagemin-mozjpeg');
  const onError = require(path.message.error);
  const isProd = process.env.NODE_ENV === 'production';

  return gulp
        .src(path.images.src)
        .pipe(gp.plumber({ errorHandler: onError }))
        .pipe(gp.rename({dirname: ''})) // to removing a folder structure
        .pipe(gp.changed(path.images.build))
        .pipe(gp.if(isProd, gp.cache(gp.imagemin(
          [
            pngquant({
              quality: [0.8, 0.9],
              speed: 2,
              strip: true
            }),
            mozjpeg({
              progressive: true,
              quality: 85,
              quantTable: 2
            }),
            gp.imagemin.gifsicle({
              interlaced: true
            }),
            gp.imagemin.svgo({
              plugins: [
                { removeViewBox: false },
                { cleanupIDs: true },
                { removeUselessStrokeAndFill: false },
                { convertPathData: false },
                { removeUselessDefs: false }
              ]
            })
          ], {
            verbose: true
          }))))
        .pipe(gp.debug({ title: 'images:', showFiles: true }))
        .pipe(gulp.dest(path.images.build))
        .on('end', browserSync.reload);
};
