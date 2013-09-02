var _ = require('underscore'),
    Config = require('./config'),
    Component;

Component = function(confiFile) {
    this.components = null;
    this.fileName = confiFile;
    this.read();
};

Component.prototype = new Config();

Component.prototype._replaceDependency = function(fileName, fileType) {
    var configs = this.configs,
        dependencies;

    fileName = fileName.replace(/\s/g, '');
    if (fileName.indexOf('res:') === 0) {
        dependencies = configs[fileName.replace('res:', '')][fileType];
        return (typeof dependencies !== 'undefined' ? dependencies : []);
    }

    return [fileName];
};

Component.prototype._parse = function(configs) {
    var _this = this,
        components;

    if (configs === null) {
        return null;
    }

    components = {};

    /**
     * Replace the res:xxxxxx with the absolute path
     */
    _.each(configs, function(configSet, key) {
        var javascript = configSet.javascript,
            css = configSet.css,
            componentResoures = {
                javascript: [],
                css: []
            };

        if (typeof javascript !== 'undefined') {
            _.each(javascript, function(fileName, index) {
                componentResoures.javascript = _.union(
                    componentResoures.javascript,
                    _this._replaceDependency(fileName, 'javascript')
                );
            });
        }

        if (typeof css !== 'undefined') {
            _.each(css, function(fileName, index) {
                componentResoures.css = _.union(
                    componentResoures.css,
                    _this._replaceDependency(fileName, 'css')
                );
            });
        }

        components[key] = componentResoures;
    });

    /**
     * Recursion call itself untill there no resources need to replace with the absolute path
     */
    recursionReplace = _.size(
        _.filter(components, function(component, key) {
            var javascript = component.javascript,
                css = component.css;

            javascript = _.filter(javascript, function(fileName) {
                return fileName.indexOf('res:') === 0;
            });

            css = _.filter(css, function(fileName) {
                return fileName.indexOf('res:') === 0;
            });

            return (_.size(javascript) > 0 || _.size(css) > 0);
        })
    ) > 0;
    if (recursionReplace) {
        return _this._parse(components);
    }

    return components;
};

Component.prototype.parse = function(componentName) {
    var components;

    if (this.components === null) {
        this.components = this._parse(this.configs);
    }

    components = this.components;
    if (components === null) {
        return null;
    }

    if (typeof componentName === 'undefined' || componentName === null) {
        return components;
    }

    if (typeof components[componentName] === 'undefined') {
        return null;
    }

    return components[componentName];
};

module.exports = Component;
