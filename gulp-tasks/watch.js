'use strict';

module.exports = function ({ gulp, path }) {

  const { watch, series, parallel } = gulp;

  return new Promise((resolve) => {

    watch(path.pug.watch, series('pug'));
    watch(path.styles.watch, series('styles'));
    watch(path.styles.lint, series('stylelint'));
    watch(path.scripts.watch, parallel('scripts', 'eslint'));
    watch(path.fonts.watch, series('fonts'));
    watch(path.images.watch, series('images'));
    watch(path.spriteSvg.watch, series('spriteSvg', 'pug'));
    watch(path.spritePng.watch, series('spritePng', parallel('images', 'styles')));
    watch('./gulp-tasks/path.js', series('pathRebuild', 'build'));

    resolve();
  });
};
