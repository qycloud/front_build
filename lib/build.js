var _ = require('underscore'),
    fs = require('fs'),
    Resource = require('./parser/resource'),
    Build;

Build = function(config) {
    this.config = config;
    this.basePath = fs.realpathSync(config.config + '/../') + '/';
};

Build.prototype._build = function(dest, sourceFiles, resourceType) {
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
        basePath;

    if (resources !== null) {
        basePath = _this.basePath;

        _.each(resources, function(resource) {
            var dest = resource.dest,
                force = config.force,
                javascript,
                css;

            if (typeof dest.javascript !== 'undefined') {
                javascript = basePath + dest.javascript;
                if (force || !fs.existsSync(javascript)) {
                    _this._build(
                        javascript,
                        _this._getFilesWithAbsolutePath(resource.javascript),
                        'JAVASCRIPT'
                    );
                }
            }

            if (typeof dest.css !== 'undefined') {
                css = basePath + dest.css;
                if (force || !fs.existsSync(css)) {
                    _this._build(
                        css,
                        _this._getFilesWithAbsolutePath(resource.css),
                        'CSS'
                    );
                }
            }
        });

        if (config.store) {
            resourceInsatance.save();
        }
    }
};

module.exports = Build;
