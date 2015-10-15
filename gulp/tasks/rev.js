'use strict';

var config = require('../config').rev;
var gulp = require('gulp');
var rev = require('gulp-rev');

// Rev static assets
gulp.task('rev', function () {

    return gulp.src(config.src)
        .pipe(rev())
        .pipe(gulp.dest(config.dest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.dest));

});
