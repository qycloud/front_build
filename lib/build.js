var _ = require('underscore'),
    fs = require('fs'),
    shell = require('shelljs'),
    Config = require('./parser/config'),
    Resource = require('./parser/resource'),
    Build;

Build = function(config) {
    this.config = config;
    this.basePath = fs.realpathSync(config.config + '/../') + '/';
};

Build.prototype._getFilesWithAbsolutePath = function(files) {
    var basePath = this.basePath;

    return _.map(files, function(fileName) {
        return basePath + fileName;
    });
}

Build.prototype._build = function(taskQueue) {
    var _this = this;
    this.tasks = {
        concat: {
            task: {
                files: {}
            }
        },
        uglify: {
            task: {
                files: {}
            }
        },
        cssmin: {
            task: {
                files : {}
            }
        }
    };

    _.each(taskQueue.javascript, function(sourceFiles, dest) {
        _this.tasks.concat.task.files[dest] = sourceFiles;
        _this.tasks.uglify.task.files[dest] = sourceFiles;
    });

    _.each(taskQueue.css, function(sourceFiles, dest) {
        _this.tasks.cssmin.task.files[dest] = sourceFiles;
    });

    shell.grunt.build();
};

Build.prototype.run = function() {
    var config = this.config,
        _this = this,
        resourceInsatance = new Resource(config.config),
        resources = resourceInsatance.parse(),
        configInstance,
        basePath,
        buildDirectory,
        taskQueue;

    if (resources !== null) {
        basePath = _this.basePath;
        configInstance = new Config(config.config);
        configInstance.read();
        buildDirectory = configInstance.get('path', 'build');
        buildDirectory.javascript = basePath + buildDirectory.javascript + '/';
        buildDirectory.css = basePath + buildDirectory.css + '/',
        taskQueue = {
            javascript: {},
            css: {}
        };

        _.each(resources, function(resource) {
            var dest = resource.dest,
                force = config.force,
                javascript,
                css;

            if (typeof dest.javascript !== 'undefined') {
                javascript = basePath + dest.javascript;
                if (force || !fs.existsSync(javascript)) {
                    taskQueue.javascript[javascript] = _this._getFilesWithAbsolutePath(
                        resource.javascript
                    );
                }
            }

            if (typeof dest.css !== 'undefined') {
                css = basePath + dest.css;
                if (force || !fs.existsSync(css)) {
                    taskQueue.javascript[css] = _this._getFilesWithAbsolutePath(
                        resource.css
                    );
                }
            }
        });

        this._build(taskQueue);

        if (config.store) {
            resourceInsatance.save();
        }
    }
};

module.exports = Build;
