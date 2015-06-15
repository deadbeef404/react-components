var port = '9001';
var connect = require('../node_modules/grunt-contrib-connect/tasks/connect');
var jasmineConfig = {
    src: ['src/compiled/**/*.js', '!src/compiled/examples/main.js', '!src/compiled/**/tests/*.js',
          '!src/compiled/examples/**/*.js', '!src/compiled/lib/EventEmitter.js'],
    specs: ['src/compiled/**/*.test.js'],
    helpers: ['src/compiled/tests/bind-polyfill.js', 'src/compiled/tests/mock-ajax.js',
              //Expanded Jasmine assertions - https://github.com/JamieMason/Jasmine-Matchers
              'bower_components/jasmine-expect/dist/jasmine-matchers.js'],
    requireConfigFile: 'src/require.config.js',
    compiledDir: 'src/compiled',
    paths: {
        'drc/lib/EventEmitter': '../../src/compiled/lib/EventEmitter',
        ExpandedTestUtils: '../../bower_components/expanded-react-test-utils/dist/ExpandedTestUtils.min',
        RequestHandler: '../../src/compiled/utils/RequestHandler'
    }
};

module.exports = function(grunt, options) {
    return { tasks: {
        /**
         * Jasmine client side JS test tasks
         */
        jasmine: {
            debug: {
                src: jasmineConfig.src,
                options: {
                    specs: jasmineConfig.specs,
                    keepRunner: true,
                    helpers: jasmineConfig.helpers,
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: jasmineConfig.requireConfigFile,
                        requireConfig: {
                            baseUrl: jasmineConfig.compiledDir,
                            paths: jasmineConfig.paths
                        }
                    }
                }
            },

            cov: {
                src: jasmineConfig.src,
                options: {
                    specs: jasmineConfig.specs,
                    summary: true,
                    helpers: jasmineConfig.helpers,
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        replace: false,
                        coverage: 'bin/coverage/src/coverage.json',
                        report: 'bin/coverage/src',
                        thresholds: grunt.cli.tasks[0] === "test" ? {
                            lines: 98,
                            statements: 98,
                            branches: 98,
                            functions: 98
                        } : {},
                        template: require('grunt-template-jasmine-requirejs'),
                        templateOptions: {
                            requireConfigFile: jasmineConfig.requireConfigFile,
                            requireConfig: {
                                baseUrl: '.grunt/grunt-contrib-jasmine/' + jasmineConfig.compiledDir,
                                paths: jasmineConfig.paths,
                                callback: function () {
                                    define('instrumented', ['module'], function (module) {
                                        return module.config().src;
                                    });
                                    require(['instrumented'], function () {
                                        var oldLoad = requirejs.load;
                                        requirejs.load = function (context, moduleName, url) {
                                            console.log(url);
                                            if (url.indexOf('bower_components') !== -1 ||
                                                url.indexOf('dist') !== -1 ||
                                                url.indexOf('EventEmitter') !== -1) {
                                                url = url.substring(48);
                                            }

                                            return oldLoad.apply(this, [context, moduleName, url]);
                                        };
                                    });
                                }
                            }
                        }
                    }
                }
            }
        },

        /**
         * ESLint configuration. See http://eslint.org and .eslintrc files for details.
         */
        eslint:{
            target: [
                'src/**/*.js',
                '!src/compiled/**/*.js',
                '!src/js/tests/*.js',
                '!src/js/lib/EventEmitter.js',
                '!src/**/*.test.js'
            ]
        },

        /**
         * Static web server used to server code coverage result files.
         */
        connect: {
            all: {
                options: {
                    port: port,
                    hostname: "0.0.0.0",
                    keepalive: true
                }
            }
        },

        /**
         * Opens users browser to a specific URL.
         * @type {Object}
         */
        open: {
            test: {
                path: 'http://localhost:<%= connect.all.options.port%>/_SpecRunner.html'
            },
            cov: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= connect.all.options.port%>/bin/'
            }
        }
    }};
};
