module.exports = function(grunt) {
    var pkg = grunt.file.readJSON(require('os').tmpdir() + '/grunt.json');
    grunt.initConfig({
        concat: pkg.concat,
        uglify: pkg.uglify,
        cssmin: pkg.cssmin
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('build', ['concat', 'uglify', 'cssmin']);
};