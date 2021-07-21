'use strict';

const { task, series, parallel } = require('gulp');

/**
   * Converting a string into camel case
   * @param {string} str
   * @return {string}
   */
const camelize = str => str
  .replace(/\.(\w)/g, (match, chr) => chr.toUpperCase());

/**
   * Getting a task name from the path
   * @param {string} taskPath
   * @return {string}
   */
const getTaskName = taskPath => taskPath
  .slice(taskPath.lastIndexOf('/') + 1, taskPath.lastIndexOf('.'));

/**
 * Creating all Gulp tasks from paths ('gulp --tasks' in CLI)
 * @param {Object} options
 */
(function createGulpTasks(options) {
  options.path.tasks.forEach(taskPath => {
    options.gulp.task(camelize(getTaskName(taskPath)), function (cb) {
      let task = () => require(taskPath)(options);
      return task(cb);
    });
  });
})({
  gulp: require('gulp'),
  gp: require('gulp-load-plugins')(),
  path: require('./gulp-tasks/path.js'),
  browserSync: require('browser-sync').create()
});

task(
  'build',
  series(
    'clean',
    parallel('spriteSvg', 'spritePng', series('favicon', 'faviconManifest')),
    parallel('fonts', 'images', 'styles', 'scripts', 'stylelint', 'eslint', 'pug')
  )
);

task(
  'default',
  series(
    'build',
    parallel('watch', 'serve')));
