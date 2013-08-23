var _ = require('underscore'),
    fs = require('fs'),
    md5 = require('MD5'),
    Config = require('./config'),
    Component = require('./component'),
    Resource;

Resource = function(configFile) {
    this.config = new Config(configFile);
    this.config.read();

    this.resources = null;
    this.resourcesBasePath = fs.realpathSync(configFile + '/../') + '/';
};

Resource.prototype._md5Files = function(files) {
    var hash = [],
        basePath = this.resourcesBasePath;

    _.each(files, function(file) {
        file = basePath + file;
        hash.push(md5(file + fs.lstatSync(file).mtime));
    });

    return md5(hash.join('')).substr(0, 32);
};

Resource.prototype._getConfigs = function() {
    var configs,
        configPath,
        configFiles,
        configInstance,
        globalConfig,
        result;

    configInstance = this.config;
    configPath = configInstance.get('path', 'resources_config');
    if (typeof configPath === 'undefined') {
        return null;
    }

    configPath = this.resourcesBasePath + configPath;
    if (fs.lstatSync(configPath).isFile()) {
        configs = configInstance.getByFile(configPath);
    } else {
        configFiles = fs.readdirSync(configPath);
        if (_.size(configFiles) <= 0) {
            return null;
        }

        configs = {};
        _.each(configFiles, function(fileName) {
            var fileConfigs;

            fileName = configPath + '/' + fileName;
            if (fs.lstatSync(fileName).isFile()) {
                fileConfigs = configInstance.getByFile(fileName);
                if (fileConfigs !== null) {
                    _.each(fileConfigs, function(fileConfig, key) {
                        configs[key] = fileConfig;
                    });
                }
            }
        });
    }

    if (_.size(configs) <= 0) {
        return null;
    }

    globalConfig = null;
    result = {};
    _.each(configs, function(config, key) {
        var globalJavascript,
            javascript,
            globalCss,
            css;

        if (key === 'global') {
            globalConfig = config;
        } else {
            if (globalConfig === null) {
                result[key] = config;
            } else {
                globalJavascript = globalConfig.javascript;
                globalCss = globalConfig.css;
                if (typeof globalJavascript !== 'undefined') {
                    javascript = config.javascript;
                    if (typeof javascript === 'undefined') {
                        javascript = globalJavascript;
                    } else {
                        javascript = _.union(globalJavascript, javascript);
                    }
                }
                if (typeof globalCss !== 'undefined') {
                    css = config.css;
                    if (typeof css === 'undefined') {
                        css = globalCss;
                    } else {
                        css = _.union(globalCss, css);
                    }
                }
                config.javascript = (typeof javascript !== 'undefined' ? javascript : []);
                config.css = (typeof css !== 'undefined' ? css : []);

                result[key] = config;
            }
        }
    });

    return result;
};

Resource.prototype._replaceComponentsDependencies = function(files, type, components) {
    var result = [];

    _.each(files, function(fileName) {
        var component;
        fileName = fileName.replace(/\s/g, '');
        if (fileName.indexOf('res:') === 0) {
            component = components[fileName.replace('res:', '')][type];
            if (typeof component === 'undefined') {
                result = _.union(result, fileName);
            } else {
                result = _.union(result, component);
            }
        } else {
            result = _.union(result, fileName);
        }
    });

    return result;
},

Resource.prototype.parse = function() {
    var _this = this,
        resources = _this.resources,
        resourcesBasePath,
        configs,
        configInstance,
        componentInstance,
        prefixConfig;

    if (resources === null) {
        configs = _this._getConfigs();
        if (configs === null) {
            return null;
        }

        resourcesBasePath = _this.resourcesBasePath;
        configInstance = _this.config;
        componentInstance = new Component(
            resourcesBasePath + configInstance.get('path', 'components_config')
        );
        components = componentInstance.parse();
        componentsCount = _.size(components);

        resources = {};
        prefixConfig = configInstance.get('prefix');
        _.each(configs, function(config, key) {
            var javascript = config.javascript,
                javascriptPathPrefix = prefixConfig['resources_javascript'],
                css = config.css,
                cssPathPrefix = prefixConfig['resources_css'],
                keyPrefix = prefixConfig['resources_key'],
                javascriptHash,
                cssHash,
                destPrefix;

            if (componentsCount > 0) {
                javascript = _this._replaceComponentsDependencies(
                    javascript, 'javascript', components
                );

                css = _this._replaceComponentsDependencies(
                    css, 'css', components
                );
            }

            javascript = _.map(javascript, function(fileName) {
                return javascriptPathPrefix + '/' + fileName;
            });
            javascriptHash = _this._md5Files(javascript);

            css = _.map(css, function(fileName) {
                return cssPathPrefix + '/' + fileName;
            });
            cssHash = _this._md5Files(css);

            if (typeof configs[key]['dest_prefix'] === 'undefined') {
                destPrefix = keyPrefix + '/' + key;
            } else {
                destPrefix = configs[key]['dest_prefix'];
            }

            resources[keyPrefix + '/' + key] = {
                javascript: javascript,
                css: css,
                dest: {
                    javascript: destPrefix + '_' + javascriptHash + '.js',
                    css: destPrefix + '_' + cssHash + '.css'
                }
            };
        });

        this.resources = resources;
    }

    return resources;
};

/**
 * Save the parse result to rbuild.lock in your application root directory
 * This file is just used for your application to make sure which resource to load
 */
Resource.prototype.save = function() {
    var resources = this.parse(),
        data;

    if (_.size(resources) > 0) {
        data = {};
        _.each(resources, function(resource, key) {
            data[key] = resource['dest']
        });
        fs.writeFileSync(this.resourcesBasePath + 'rbuild.lock', JSON.stringify(data));
    }
};

module.exports = Resource;