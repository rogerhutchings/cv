'use strict';

var config = require('../config').deploy;
var gulp = require('gulp');
var gutil = require('gulp-util');
var s3 = require('s3');

gulp.task('deploy', ['build'], function (cb) {

    var uploadParams = {
        localDir: config.src,
        s3Params: config.s3,
        deleteRemoved: true,
        ACL: 'public-read',
        getS3Params: function (localFile, stat, callback) {

            var s3Params = {};
            var re = /(?:\.([^.]+))?$/;

            switch (re.exec(localFile)[1]) {
                case 'html':
                    s3Params.CacheControl = 'no-cache, no-store, max-age=0';
                    break;
                default:
                    s3Params.CacheControl = 'no-transform, public, max-age=86400, s-maxage=259200';
            }

            callback(null, s3Params);

        }
    };

    var client = s3.createClient(config.client);
    var uploader = client.uploadDir(uploadParams);

    gutil.log('Uploading files to ' + gutil.colors.red(uploadParams.s3Params.Bucket) + '...');

    uploader.on('error', function (error) {
        gutil.log('Unable to sync:', error.stack);
    });

    uploader.on('fileUploadEnd', function (localFilePath, s3Key) {
        gutil.log('Uploaded ' + gutil.colors.red(s3Key));
    });

    uploader.on('end', function () {
        setTimeout(function () {
            gutil.log('Upload complete');
            cb();
        }, 1000);
    });

});



