var mocha = require('mocha'),
    should = require('should'),
    Config = require('../../../lib/parser/config');

describe('Config(__dirname + "/../../config.json")', function() {
    var configs = {
            "path": {
                "components" : "fixtures/components.json"
            }
        },
        config = new Config(__dirname + '/../../config.json');

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

    describe('#get("path", "components")', function() {
        it('should be equal ', function() {
            config.get('path', 'components').should.equal(configs['path']['components']);
        });
    });
});
