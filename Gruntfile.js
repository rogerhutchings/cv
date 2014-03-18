(function() { 'use strict';

    // Main Grunt section ------------------------------------------------------
    module.exports = function(grunt) {

        // Load dependencies ---------------------------------------------------
        require('time-grunt')(grunt);

        // Project configuration -----------------------------------------------
        grunt.initConfig({

            pkg: grunt.file.readJSON('package.json'),

            siteDir: '_site',

            compass: {
                dist: {
                    options: {
                        config: 'config.rb'
                    }
                }
            },

            jekyll: {
                build: {
                    dest: '<%= siteDir %>'
                }
            },

            watch: {
                sass: {
                    files: ['_sass/**/*.sass'],
                    tasks: ['compass', 'copy:assets'],
                },
                jekyll: {
                    files: ['_config.yml', '**/*.{html, md, yaml, yml}'],
                    tasks: ['jekyll']
                }
            },

            connect: {
                server: {
                    options: {
                        port: 4000,
                        base: '<%= siteDir %>'
                    }
                }
            }

        });


        // Tasks ---------------------------------------------------------------
        grunt.registerTask(
            'default',
            'Default task: serve',
            ['serve']
        );

        grunt.registerTask(
            'build',
            'Recompiles the sass, js, and rebuilds Jekyll',
            function () {
                grunt.loadNpmTasks('grunt-contrib-compass');
                grunt.loadNpmTasks('grunt-jekyll');
                grunt.task.run('compass', 'jekyll');
            }
        );

        grunt.registerTask(
            'serve',
            'Start a web server on port 4000, and rebuild after changes',
            function () {
                grunt.loadNpmTasks('grunt-contrib-connect');
                grunt.loadNpmTasks('grunt-contrib-watch');
                grunt.task.run('build', 'connect', 'watch');
            }
        );

    };

})();
