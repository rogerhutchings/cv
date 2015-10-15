'use strict';

var config = require('../config').tidy;
var del = require('del');
var gulp = require('gulp');

// Delete originals of rev'd files, and the manifest
gulp.task('tidy', function () {

    var files = Object.keys(require(config.manifest))
        .map(function (file) {
            return [config.dest, file].join('/');
        })
        .concat([config.manifest]);

    return del(files);

});
