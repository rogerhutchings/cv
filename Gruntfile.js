(function() {

    'use strict';

    // Main Grunt section ------------------------------------------------------
    module.exports = function(grunt) {

        // Load dependencies ---------------------------------------------------
        require('time-grunt')(grunt);

        // Project configuration -----------------------------------------------
        grunt.initConfig({

            pkg: grunt.file.readJSON('package.json'),

            devDir: '_dev',
            prodDir: '_prod',

            compass: {
                compile: {
                    options: {
                        config: 'config.rb'
                    }
                }
            },

            connect: {
                server: {
                    options: {
                        port: 4000,
                        base: '<%= devDir %>'
                    }
                }
            },

            jekyll: {
                options: {

                },
                dev: {
                    options: {
                        dest: '<%= devDir %>',
                    }
                },
                prod: {
                    options: {
                        dest: '<%= prodDir %>',
                        config: '_config.yml,_config-production.yml'
                    }
                }
            },

            'ftp-deploy': {
                prod: {
                    auth: {
                        host: 'ftp.rogerhutchings.co.uk',
                        port: 21,
                        authKey: 'cv'
                    },
                    src: '<%= prodDir %>',
                    dest: 'cv'
                }
            },

            watch: {
                sass: {
                    files: ['_sass/**/*.sass'],
                    tasks: ['build:dev']
                },
                jekyll: {
                    files: [
                        '**/*.{html,yaml,yml,md}',
                        '_config.yml',
                        'style.css',
                        '!<%= devDir %>/**/*',
                        '!<%= prodDir %>/**/*'
                    ],
                    tasks: ['build:dev']
                }
            }

        });

        grunt.loadNpmTasks('grunt-contrib-compass');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-ftp-deploy');
        grunt.loadNpmTasks('grunt-jekyll');

        // Tasks ---------------------------------------------------------------
        grunt.registerTask(
            'default',
            'Default task: serve',
            ['serve']
        );

        grunt.registerTask(
            'build',
            'Recompiles the sass, js, and rebuilds Jekyll',
            function (target) {
                target = target || 'dev';
                grunt.task.run(['compass', 'jekyll:' + target]);
            }
        );

        grunt.registerTask(
            'deploy',
            'Rebuilds the site, and deploys to rogerhutchin.gs/cv',
            ['build:prod', 'ftp-deploy']
        );

        grunt.registerTask(
            'serve',
            'Start a web server on port 4000, and rebuild after changes',
            ['build:dev', 'connect', 'watch']
        );

    };

})();
