'use strict';

module.exports = function (error) {
  
  const notify = require('gulp-notify');

  notify.onError({
    title: 'Error in ' + error.plugin,
    message: [
      '',
      '----------ERROR MESSAGE START----------',
      error.message,
      '----------ERROR MESSAGE END----------'
    ].join('\n'),
    sound: 'Hero'
  })(error);
  this.emit('end');
};
