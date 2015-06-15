'use strict';

module.exports.tasks = {
    /**
     * Compass compile task. Compiles everything under the app/sass
     * directory into a single file in dist
     */
    compass: {
        dist: {
            options: {
                cssDir: 'dist',
                sassDir: 'src/sass',
                environment: 'production'
            }
        },
        dev: {
            options: {
                cssDir: 'src/js/examples/css',
                sassDir: 'src/js/examples/sass',
                environment: 'production'
            }
        }
    },

    /**
     * File watcher for Sass compile step. Automatically rebuilds sass on change.
     */
    watch: {
        sass: {
            files: ['src/**/*.scss'],
            tasks: ['compass:dist', 'compass:dev']
        }
    },

    shell: {
        cleanCompiledDirectory: {
            command: 'rm -rf src/compiled'
        },
        init: {
            command: './init.sh'
        },
        jsxCompile: {
            command: 'jsx src/js/ src/compiled/'
        },
        jsxWatcher: {
            command: 'jsx --watch src/js/ src/compiled/',
            options: {
                async: true
            }
        }
    }
};
