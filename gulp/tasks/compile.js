'use strict';

var config = require('../config').compile;
var gulp = require('gulp');
var harp = require('harp');

// Runs `harp compile`
gulp.task('compile', function (cb) {
    harp.compile(config.src, config.dest, cb);
});
