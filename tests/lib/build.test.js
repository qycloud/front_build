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
        force: false
    });

    describe('#run()', function() {
        build.run();

        describe('Read __dirname + "/../build/javascripts/" directory', function() {
            it('File controllers_global_5ae2d350ecf717e5a0b812b044f33f87.js md5 value should be equal', function() {
                var fileName = __dirname + '/../build/javascripts/controllers_global_5ae2d350ecf717e5a0b812b044f33f87.js';
                md5(fs.readFileSync(fileName)).substr(0, 32).should.equal('');
            });

            it('File home-min_1b6316803455be0c0bdbe08fd52c44b5.js md5 value should be equal', function() {
                var fileName = __dirname + '/../build/javascripts/home-min_1b6316803455be0c0bdbe08fd52c44b5.js';
                md5(fs.readFileSync(fileName)).substr(0, 32).should.equal('');
            });

            it('File users-min_f9681fdf76cf085a6c5b2295112398de.js md5 value should be equal', function() {
                var fileName = __dirname + '/../build/javascripts/users-min_f9681fdf76cf085a6c5b2295112398de.js';
                md5(fs.readFileSync(fileName)).substr(0, 32).should.equal('');
            });
        });

        describe('Read __dirname + "/../build/stylesheets/" directory', function() {
            it('File controllers_global_15a63a0c6a738eb8de8e823d2b5aafda.css md5 value should be equal', function() {
                var fileName = __dirname + '/../build/stylesheets/controllers_global_15a63a0c6a738eb8de8e823d2b5aafda.css';
                md5(fs.readFileSync(fileName)).substr(0, 32).should.equal('');
            });

            it('File home-min_15a63a0c6a738eb8de8e823d2b5aafda.css md5 value should be equal', function() {
                var fileName = __dirname + '/../build/stylesheets/home-min_15a63a0c6a738eb8de8e823d2b5aafda.css';
                md5(fs.readFileSync(fileName)).substr(0, 32).should.equal('');
            });

            it('File users-min_48d508549dffd696499a5173ef898c13.css md5 value should be equal', function() {
                var fileName = __dirname + '/../build/stylesheets/users-min_48d508549dffd696499a5173ef898c13.css';
                md5(fs.readFileSync(fileName)).substr(0, 32).should.equal('');
            });
        });
    });
});
