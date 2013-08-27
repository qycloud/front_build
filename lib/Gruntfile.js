var build = require('build');

module.exports = function(grunt) {
    grunt.initConfig({

        concat: build.tasks.concat,

        uglify: build.tasks.uglify,

        mincss: build.tasks.cssmin

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('build', ['concat', 'uglify', 'cssmin']);
};