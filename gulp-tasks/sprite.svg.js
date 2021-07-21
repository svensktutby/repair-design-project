'use strict';

module.exports = function ({ gulp, gp, path }) {

  const onError = require(path.message.error);

  return gulp
        .src(path.spriteSvg.src)
        .pipe(gp.plumber({ errorHandler: onError }))
        .pipe(gp.debug({ title: 'sprite:svg:', showFiles: false }))
        .pipe(
          gp.cache(
            gp.imagemin([
              gp.imagemin.svgo({
                plugins: [
                  { removeViewBox: false },
                  { cleanupIDs: true },
                  { removeAttrs: { attrs: ['version', 'fill', 'stroke', 'stroke-width'] } },
                  { removeUselessStrokeAndFill: false },
                  { convertPathData: false }
                ]
              })
            ])
          )
        )
        .pipe(gp.svgstore({
          inlineSvg: true
          /* need to turn off if it will be used as an external sprite
          because the imagemin.svgo in the images task creates an empty svg file */
        }))
        .pipe(gp.rename('sprite.svg'))
        .pipe(gulp.dest(path.spriteSvg.build));
};
