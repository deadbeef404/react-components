var port = '9001';
var connect = require('../node_modules/grunt-contrib-connect/tasks/connect');

module.exports = function(grunt, options) {
    return { tasks: {
        /**
         * Jasmine client side JS test tasks
         */
        jasmine: {
            src: ['src/compiled/**/*.js',
                '!src/compiled/examples/main.js', '!src/compiled/**/tests/*.js',
                '!src/compiled/examples/**/*.js', '!src/compiled/lib/EventEmitter.js'],
            options: {
                specs: ['src/compiled/**/*.test.js'],
                helpers: [
                    'src/compiled/tests/bind-polyfill.js',
                    'src/compiled/tests/mock-ajax.js',
                    //Expanded Jasmine assertions - https://github.com/JamieMason/Jasmine-Matchers
                    'bower_components/jasmine-expect/dist/jasmine-matchers.js'
                ],
                template: require('grunt-template-jasmine-istanbul'),
                templateOptions: {
                    coverage: 'bin/coverage/src/coverage.json',
                    report: 'bin/coverage/src',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: 'src/require.config.js',
                        requireConfig: {
                            baseUrl: 'src/compiled/',
                            paths: {
                                d3: '../../../bower_components/d3/d3',
                                jquery: '../../../bower_components/jquery/dist/jquery',
                                lodash: '../../../bower_components/lodash/lodash',
                                moment: '../../../bower_components/moment/moment',
                                react: '../../../bower_components/react/react-with-addons',
                                flux: '../../../bower_components/flux/dist/Flux',
                                testUtil: '../../../src/compiled/tests/util',
                                RequestHandler: '../../../src/compiled/utils/RequestHandler',
                                'drc/lib/EventEmitter': '../../../src/compiled/lib/EventEmitter'
                            },
                            callback: function () {
                                define('instrumented', ['module'], function (module) {
                                    return module.config().src;
                                });
                                require(['instrumented'], function () {
                                    var oldLoad = requirejs.load;
                                    requirejs.load = function (context, moduleName, url) {
                                        // normalize paths
                                        // changes src/compiled/../../../bower_components/* to bower_components/*
                                        if (url.indexOf('src/compiled/../../../') === 0) {
                                            url = url.substring(22);
                                        }
                                        // changes src/compiled/../../.grunt/grunt-contrib-jasmine/src/compiled/* to grunt/grunt-contrib-jasmine/src/compiled/*
                                        else if (url.indexOf('src/compiled/../../.') === 0) {
                                            url = url.substring(19);
                                        }
                                        // changes src/compiled/* to .grunt/grunt-contrib-jasmine/src/compiled/* without altering test files
                                        else if (url.indexOf('src/compiled/') === 0 && url.indexOf('test') === -1) {
                                            url = '.grunt/grunt-contrib-jasmine/' + url;
                                        }
                                        return oldLoad.apply(this, [context, moduleName, url]);
                                    };
                                });
                            }
                        }
                    }
                }
            }
        },

        /**
         * ESLint configuration. See http://eslint.org and .eslintrc files
         * for details
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
         * Static web server. Used to server code coverage result files
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
         * Opens users browser to a specific URL
         * @type {Object}
         */
        open: {
            all: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= connect.all.options.port%>/bin/'
            }
        }
    }};
};
