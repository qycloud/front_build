var mocha = require('mocha'),
    should = require('should'),
    Config = require('../../../lib/parser/config');

describe('Config(__dirname + "/../../.rbuildrc")', function() {
    var configs = {
            "path": {
                "build": {
                    "javascript": "build/javascripts",
                    "css": "build/stylesheets"
                },
                "components_config": "configs/components.json",
                "resources_config": "configs/resources",
                "static_root": "assets"
            },
            "prefix": {
                "resources_key": "controllers",
                "resources_css": "assets/stylesheets",
                "resources_javascript": "assets/javascripts"
            }
        },
        config = new Config(__dirname + '/../../.rbuildrc');

    config.read();

    describe('#read()', function() {
        it ('config.configs should equality', function() {
            config.configs.should.eql(configs);
        });
    });

    describe('#get("path")', function() {
        it ('should be equality', function() {
            config.get('path').should.eql(configs['path']);
        });
    });

    describe('#get("path", "components_config")', function() {
        it('should be equal ', function() {
            config.get('path', 'components_config').should.equal(configs['path']['components_config']);
        });
    });
});
