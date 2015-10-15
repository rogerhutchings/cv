'use strict';

var config = require('../config').clean;
var del = require('del');
var gulp = require('gulp');

// Trash the `/build` folder
gulp.task('clean', function () {

    return del([config.src]);

});
