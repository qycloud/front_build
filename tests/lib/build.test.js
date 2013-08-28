var _ = require('underscore'),
    fs = require('fs'),
    md5 = require('MD5'),
    mocha = require('mocha'),
    should = require('should'),
    Build = require('../../lib/build');

describe('Build(configs)', function() {
    var build = new Build({
        config: __dirname + '/../.rbuildrc',
        store: true,
        force: true
    });

    describe('#run()', function() {
        build.run();

        describe('Read __dirname + "/../build/javascripts/" directory', function() {
            it('File controllers_global_b196ed432fe056c1d251d40f1fd6349c.js md5 value should be equal', function() {
                var fileName = __dirname + '/../build/javascripts/controllers_global_b196ed432fe056c1d251d40f1fd6349c.js';
                md5(fs.readFileSync(fileName)).substr(0, 32).should.equal('dc2f5e129af2225d7e5573b4ecbd5c2a');
            });

            it('File home-min_dd4320cf05806c3f000139b455f4d463.js md5 value should be equal', function() {
                var fileName = __dirname + '/../build/javascripts/home-min_dd4320cf05806c3f000139b455f4d463.js';
                md5(fs.readFileSync(fileName)).substr(0, 32).should.equal('dc2f5e129af2225d7e5573b4ecbd5c2a');
            });

            it('File users-min_59b7709b2325fca2ce881c79151c05a9.js md5 value should be equal', function() {
                var fileName = __dirname + '/../build/javascripts/users-min_59b7709b2325fca2ce881c79151c05a9.js';
                md5(fs.readFileSync(fileName)).substr(0, 32).should.equal('62bb4f100a265fffb4f8394b738533c7');
            });
        });

        describe('Read __dirname + "/../build/stylesheets/" directory', function() {
            it('File controllers_global_806e041eeef5f478a718b6ed9ca9c17a.css md5 value should be equal', function() {
                var fileName = __dirname + '/../build/stylesheets/controllers_global_806e041eeef5f478a718b6ed9ca9c17a.css';
                md5(fs.readFileSync(fileName)).substr(0, 32).should.equal('6700e3e577966de91432a219303a54ce');
            });

            it('File home-min_806e041eeef5f478a718b6ed9ca9c17a.css md5 value should be equal', function() {
                var fileName = __dirname + '/../build/stylesheets/home-min_806e041eeef5f478a718b6ed9ca9c17a.css';
                md5(fs.readFileSync(fileName)).substr(0, 32).should.equal('6700e3e577966de91432a219303a54ce');
            });

            it('File users-min_6ce13c9e392baf3fd9484138f786976e.css md5 value should be equal', function() {
                var fileName = __dirname + '/../build/stylesheets/users-min_6ce13c9e392baf3fd9484138f786976e.css';
                md5(fs.readFileSync(fileName)).substr(0, 32).should.equal('82fed323eb204bb4606112208016e34d');
            });
        });
    });
});
