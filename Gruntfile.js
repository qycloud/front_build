module.exports = function(grunt) {
    var pkg = grunt.file.readJSON(require('os').tmpdir() + '/grunt.json'),
        replaceCssUrl = (typeof pkg.css_url_replace !== 'undefined');

    if (replaceCssUrl) {
        grunt.initConfig({
            copy: pkg.copy,
            concat: pkg.concat,
            uglify: pkg.uglify,
            clean: pkg.clean
        });
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.registerTask(
            'build',
            ['copy', 'uglify', 'concat', 'clean']
        );
    } else {
        grunt.initConfig({
            copy: pkg.copy,
            concat: pkg.concat,
            uglify: pkg.uglify,
            clean: pkg.clean
        });
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.registerTask(
            'build', ['copy', 'uglify', 'concat', 'clean']
        );
    }
};
