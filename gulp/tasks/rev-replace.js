'use strict';

var config = require('../config').revReplace;
var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');

// Replaces handlebars tags with rev'd asset paths
gulp.task('revReplace', function () {

    var context = require(config.manifest);

    var options = {
        helpers: {
            asset: function (path, context) {
                return '/' + context.data.root[path];
            }
        }
    };

    return gulp.src(config.src)
        .pipe(handlebars(context, options))
        .pipe(gulp.dest('build'));

});
