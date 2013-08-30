module.exports = function(grunt) {
    var pkg = grunt.file.readJSON(require('os').tmpdir() + '/grunt.json'),
        replaceCssUrl = (typeof pkg.css_url_replace !== 'undefined');

    if (replaceCssUrl) {
        grunt.initConfig({
            concat: pkg.concat,
            uglify: pkg.uglify,
            css_url_replace: pkg.css_url_replace,
            cssmin: pkg.cssmin
        });
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-css-url-replace');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.registerTask('build', ['concat', 'uglify', 'css_url_replace', 'cssmin']);
    } else {
        grunt.initConfig({
            concat: pkg.concat,
            uglify: pkg.uglify,
            cssmin: pkg.cssmin
        });
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.registerTask('build', ['concat', 'uglify', 'cssmin']);
    }
};