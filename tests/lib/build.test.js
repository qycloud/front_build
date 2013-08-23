var _ = require('underscore'),
    fs = require('fs'),
    md5 = require('MD5'),
    mocha = require('mocha'),
    should = require('should'),
    Build = require('../../lib/build');

describe('Build(configs)', function() {
    var build = new Build({
        config: __dirname + '/../.rbuildrc',
        store: true
    });

    describe('#run()', function() {
        it('should be true', function() {
            build.run().should.be.true;
        });
    });
});

describe('Read __dirname + "/../build" directory', function() {
    function md5Files(directory) {
        var files,
            hash;

        if (fs.existsSync(directory)) {
            files = fs.readdirSync(directory);
            if (_.size(files) <= 0) {
                return null;
            }

            hash = [];
            _.each(files, function(file) {
                file = directory + file;
                hash.push(md5(fs.readFileSync(file)));
            });

            return md5(hash.join('')).substr(0, 32);
        }

        return null;
    }

    it('Javascript files md5 value should be equal', function() {
        md5Files(__dirname + '/../build/javascripts/').should.equal('');
    });

    it('Stylesheets files md5 value should be equal', function() {
        md5Files(__dirname + '/../build/stylesheets/').should.equal('');
    })
});