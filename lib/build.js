var _ = require('underscore'),
    fs = require('fs'),
    grunt = require('../node_modules/grunt/lib/grunt'),
    os = require('os'),
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

Build.prototype.run = function() {
    var _this = this,
        config = _this.config,
        resourceInsatance = new Resource(config.config),
        resources = resourceInsatance.parse(),
        configInstance,
        basePath,
        buildDirectory,
        tasks = {
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
                    files: {}
                }
            }
        };

    if (resources !== null) {
        basePath = _this.basePath;
        configInstance = new Config(config.config);
        configInstance.read();
        buildDirectory = configInstance.get('path', 'build');
        buildDirectory.javascript = basePath + buildDirectory.javascript + '/';
        buildDirectory.css = basePath + buildDirectory.css + '/';

        if (config.replace === true) {
            tasks.css_url_replace = {
                task: {
                    options: {
                      staticRoot: configInstance.get('path', 'static_root')
                    },
                    files: {}
                }
            };
        }

        _.each(resources, function(resource) {
            var dest = resource.dest,
                force = config.force,
                javascript,
                css;

            if (typeof dest.javascript !== 'undefined') {
                javascript = basePath + dest.javascript;
                if (force || !fs.existsSync(javascript)) {
                    tasks.concat.task.files[javascript] = _this._getFilesWithAbsolutePath(resource.javascript);
                    tasks.uglify.task.files[javascript] = _this._getFilesWithAbsolutePath(resource.javascript);
                }
            }

            if (typeof dest.css !== 'undefined') {
                css = basePath + dest.css;
                if (force || !fs.existsSync(css)) {
                    if (config.replace === true) {
                        tasks.css_url_replace.task.files[css] = _this._getFilesWithAbsolutePath(resource.css);
                        tasks.cssmin.task.files[css] = [css];
                    } else {
                        tasks.cssmin.task.files[css] = _this._getFilesWithAbsolutePath(resource.css);
                    }
                }
            }
        });

        if (config.store) {
            resourceInsatance.save();
        }

        fs.writeFileSync(os.tmpdir() + '/grunt.json', JSON.stringify(tasks));
        grunt.tasks(['build'], {gruntfile: __dirname + '/../Gruntfile.js'});
    }
};

module.exports = Build;