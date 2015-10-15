'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

// Produces a compiled version of the site, including post-compile steps for
// produce versioned assets etc
gulp.task('build', ['clean'], function (cb) {
    runSequence(
        'compile',
        'rev',
        'revReplace',
        'tidy',
        cb
    );
});
