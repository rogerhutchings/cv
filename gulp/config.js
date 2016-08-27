'use strict';

var config = module.exports = {};

// Directories
var rootDir = process.cwd();
var publicDir = rootDir + '/public';
var buildDir = rootDir + '/build';

// Files
var manifestFile = buildDir + '/rev-manifest.json';

// Other settings
var port = 9000;

// Config blocks for tasks
config.clean = {
    src: buildDir + '/**'
};

config.compile = {
    src: rootDir,
    dest: buildDir
};

config.dev = {
    browserSync: {
        proxy: 'localhost:' + port
    },
    harp: {
        src: publicDir,
        options: {
            port: port
        }
    },
    watch: {
        content: [
            publicDir + '/**/*.jade',
            publicDir + '/**/*.json'
        ],
        styles: rootDir + '/styles/**/*.styl'
    }
};

config.rev = {
    src: [
        buildDir + '/main.css'
    ],
    dest: buildDir
};

config.revReplace = {
    manifest: manifestFile,
    src: buildDir + '/index.html'
};

config.tidy = {
    manifest: manifestFile,
    dest: buildDir
};
