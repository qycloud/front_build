var Config = require('./parser/config'),
    Resource = require('./parser/resource'),
    Build;

Build = function(config) {
    this.config = config;
};

Build.prototype._build = function(resources) {
    var configInstance = new Config(this.config.config),
        buildDirectory;

    configInstance.read();
    buildDirectory = configInstance.get('path', 'build');

    return false;
};

Build.prototype.run = function() {
    var config = this.config,
        resourceInsatance = new Resource(config.config),
        resources = resourceInsatance.parse();

    if (resources !== null) {
        if (this._build(resources)) {
            if (config.store) {
                resourceInsatance.store();
            }
            return true;
        }
        return false;
    }

    return true;
};

module.exports = Build;
