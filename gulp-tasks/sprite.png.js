'use strict';

module.exports = function ({ gulp, gp, path }) {

  const buffer = require('vinyl-buffer');
  const merge = require('merge-stream');
  const del = require('del');
  let fileName = 'sprite-' + Math.random().toString().replace(/[^0-9]/g, '') + '.png';
  del(`${path.spritePng.build}/img/*.png`);

  let spriteData = gulp.src(path.spritePng.src)
      .pipe(gp.debug({ title: 'sprite:png:', showFiles: false }))
      .pipe(gp.spritesmith({
        imgName: fileName,
        cssName: 'sprite-png.scss',
        cssFormat: 'css',
        padding: 30,
        algorithm: 'top-down',
        imgPath: '../img/' + fileName
      }));

    let imgStream = spriteData.img
      .pipe(buffer())
      .pipe(gulp.dest(`${path.spritePng.build}/img/`));

    let cssStream = spriteData.css
      .pipe(gulp.dest(path.spritePng.build));

    return merge(imgStream, cssStream);
};
