var _ = require('underscore'),
    fs = require('fs'),
    Config = require('./parser/config'),
    Resource = require('./parser/resource'),
    Build;

Build = function(config) {
    this.config = config;
    this.basePath = fs.realpathSync(config.config + '/../') + '/';
};

Build.prototype._build = function(dest, sourceFiles, resourceType) {
};

Build.prototype.run = function() {
    var _this = this,
        config = _this.config,
        resourceInsatance = new Resource(config.config),
        resources = resourceInsatance.parse(),
        configInstance,
        basePath,
        buildDirectory;

    if (resources !== null) {
        basePath = _this.basePath;
        configInstance = new Config(config.config);
        configInstance.read();
        buildDirectory = configInstance.get('path', 'build');
        buildDirectory.javascript = basePath + buildDirectory.javascript + '/';
        buildDirectory.css = basePath + buildDirectory.css + '/';

        _.each(resources, function(resource) {
            var dest = resource.dest,
                force = config.force,
                javascript,
                css;

            if (typeof dest.javascript !== 'undefined') {
                javascript = buildDirectory.javascript + dest.javascript;
                if (force || !fs.existsSync(javascript)) {
                    _this._build(javascript, resource.javascript, 'JAVASCRIPT');
                }
            }

            if (typeof dest.css !== 'undefined') {
                css = buildDirectory.css + dest.css;
                if (force || !fs.existsSync(css)) {
                    _this._build(css, resource.css, 'CSS');
                }
            }
        });

        if (config.store) {
            resourceInsatance.save();
        }
    }
};

module.exports = Build;
