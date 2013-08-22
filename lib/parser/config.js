var Config = function(fileName) {
    this.fileName = fileName;
    this.configs = null;
};

Config.prototype.getByFile = function(fileName) {
    var configs = require('fs').readFileSync(fileName).toString();
    return (configs ? JSON.parse(configs) : null);
};

Config.prototype.read = function() {
    this.configs = this.getByFile(this.fileName);
};

Config.prototype.get = function(section, option) {
    var configs = this.configs;

    if (configs === null) {
        return null;
    }

    if (typeof section === 'undefined') {
        return configs;
    }

    if (typeof configs[section] === 'undefined') {
        return null;
    }

    if (typeof option === 'undefined') {
        return configs[section];
    }

    if (typeof configs[section][option] === 'undefined') {
        return null;
    }

    return configs[section][option];
};

module.exports = Config;
