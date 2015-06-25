//On OSX sed -i requires a different argument signature
var sedOptions = '-i';
if (process.platform === 'darwin') {
    sedOptions += " ''";
}

module.exports = function(grunt, options) {
    return {
        tasks: {
            uglify: {
                options: {
                    mangle: false
                },
                min: {
                    files: grunt.file.expandMapping(['src/compiled/**/*.js',
                                                     '!src/compiled/**/*.test.js',
                                                     '!src/compiled/tests/**/*.js',
                                                     '!src/compiled/examples/**/*.js'], './', {
                        rename: function (destBase, destPath) {
                            return destBase + destPath.replace('.js', '.min.js');
                        }
                    })
                }
            },
            /**
             * Shell command for building the minified files
             */
            shell:{
                build: {
                    command: [
                        //'./init.sh',
                        //'grunt test',
                        'grunt compass',
                        'chmod 777 dist',
                        'grunt uglify:min',
                        // Modify require paths to use minified files.
                        "find src\/compiled -name \'*.min.js\' -print0 | xargs -0 sed " + sedOptions + " \"s#\\(require[(][\'|\\\"]drc\/[^\'\\\"]*\\)#\\1.min#g\""
                    ].join('&&'),
                    options: {
                        async: false
                    }
                },
                options: {
                    execOptions: {
                        detached: true
                    }
                }
            }
        }
    };
};
