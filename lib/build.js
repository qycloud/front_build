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
};

Build.prototype.run = function() {
    var _this = this,
        config = _this.config,
        resourceInsatance = new Resource(config.config),
        resources = resourceInsatance.parse(),
        tasks = {
            copy: {
                main: {
                    files: []
                }
            },
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
            }, 
            clean: {
                files: [],
                options: {
                    force: true
                }
            }
        },
        removeFiles = [],
        tempResourceMap = {},
        resourceFiles = [],
        configInstance,
        basePath,
        buildDirectory,
        rbuildLock;

    if (resources !== null) {
        basePath = _this.basePath;
        configInstance = new Config(config.config);
        configInstance.read();
        buildDirectory = configInstance.get('path', 'build');
        buildDirectory.javascript = basePath + buildDirectory.javascript + '/';
        buildDirectory.css = basePath + buildDirectory.css + '/';

        if (fs.existsSync(basePath + 'rbuild.lock')) {
            rbuildLock = fs.readFileSync(basePath + 'rbuild.lock').toString();
            if (rbuildLock) {
                rbuildLock = JSON.parse(rbuildLock);
            }

            _.each(rbuildLock, function(lock) {
                var javascript = lock.javascript,
                    css = lock.css;

                if (typeof javascript !== 'undefined') {
                    removeFiles.push(basePath + javascript);
                }

                if (typeof css !== 'undefined') {
                    removeFiles.push(basePath + css);
                }
            });
        }

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

            if (typeof dest.javascript !== 'undefined' && dest.javascript !== null) {
                javascript = basePath + dest.javascript;
                if (!force && fs.existsSync(javascript)) {
                    removeFiles = _.without(removeFiles, javascript);
                }
            }
            _.each(_this._getFilesWithAbsolutePath(resource.javascript), function(jsFile) {
                resourceFiles.push(jsFile);
            });
            
            if (typeof dest.css !== 'undefined' && dest.css !== null) {
                css = basePath + dest.css;
                if (force || !fs.existsSync(css)) {
                    if (config.replace === true) {
                        tasks.css_url_replace.task.files[css] = _this._getFilesWithAbsolutePath(resource.css);
                        tasks.cssmin.task.files[css] = [css];
                    } else {
                        tasks.cssmin.task.files[css] = _this._getFilesWithAbsolutePath(resource.css);
                    }
                } else {
                    removeFiles = _.without(removeFiles, css);
                }
            }
        });


        if (_.size(removeFiles) > 0) {
            _.each(removeFiles, function(removeFile) {
                if (fs.existsSync(removeFile)) {
                    fs.unlinkSync(removeFile);
                }
            });
        }

        resourceFiles = _.uniq(resourceFiles);

        _.each(resourceFiles, function(jsFile) {
            tempResourceMap[jsFile] = buildDirectory.javascript + 'dest/' + jsFile;
            tasks.copy.main.files.push({
                expand: true, 
                src: [jsFile], 
                dest: buildDirectory.javascript + 'dest/', 
                filter: 'isFile'
            });
            tasks.uglify.task.files[buildDirectory.javascript + 'dest/' + jsFile] = [jsFile];
        });

        _.each(resources, function(resource) {
            var dest = resource.dest, javascript;

            if (typeof dest.javascript !== 'undefined' && dest.javascript !== null) {
                javascript = basePath + dest.javascript;
                tasks.concat.task.files[javascript] = _.map(
                    _this._getFilesWithAbsolutePath(resource.javascript), 
                    function(js) {
                        return tempResourceMap[js];
                    }
                );
            }
        });

        tasks.clean.files = [buildDirectory.javascript + 'dest'];

        if (config.store) {
            resourceInsatance.save();
        }

        fs.writeFileSync(os.tmpdir() + '/grunt.json', JSON.stringify(tasks));
        grunt.tasks(['build'], {gruntfile: __dirname + '/../Gruntfile.js'});
    }
};

module.exports = Build;