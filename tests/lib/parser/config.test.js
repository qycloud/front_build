var mocha = require('mocha'),
    should = require('should'),
    Config = require('../../../lib/parser/config');

describe('Config(__dirname + "/../../.buildrc")', function() {
    var configs = {
            "path": {
                "build_dest": "build",
                "components_config": "configs/components.json",
                "resources_config": "configs/resources"
            },
            "prefix": {
                "resources_controller": "controllers",
                "resources_css": "assets/stylesheets",
                "resources_javascript": "assets/javascripts"
            }
        },
        config = new Config(__dirname + '/../../.buildrc');

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
