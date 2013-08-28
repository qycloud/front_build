var fs = require('fs'),
    mocha = require('mocha'),
    should = require('should'),
    Resource = require('../../../lib/parser/resource');

describe('Resource(__dirname + "/../../.rbuildrc")', function() {
    var resource = new Resource(__dirname + '/../../.rbuildrc'),
        resources = {
            "controllers/global": {
                "javascript": [
                    "assets/javascripts/jquery/jquery.js"
                ],
                "css": [
                    "assets/stylesheets/base.css",
                ],
                "dest": {
                    "javascript": "build/javascripts/controllers_global_b196ed432fe056c1d251d40f1fd6349c.js",
                    "css": "build/stylesheets/controllers_global_806e041eeef5f478a718b6ed9ca9c17a.css"
                }
            },
            "controllers/home@index": {
                "javascript": [
                    "assets/javascripts/jquery/jquery.js",
                    "assets/javascripts/home.js"
                ],
                "css": [
                    "assets/stylesheets/base.css",
                ],
                "dest": {
                    "javascript": "build/javascripts/home-min_dd4320cf05806c3f000139b455f4d463.js",
                    "css": "build/stylesheets/home-min_806e041eeef5f478a718b6ed9ca9c17a.css"
                }
            },
            "controllers/users@index": {
                "javascript": [
                    "assets/javascripts/jquery/jquery.js",
                    "assets/javascripts/jquery/ui/jquery.ui.core.js",
                    "assets/javascripts/jquery/ui/jquery.ui.widget.js",
                    "assets/javascripts/jquery/ui/jquery.ui.mouse.js",
                    "assets/javascripts/jquery/ui/jquery.ui.button.js",
                    "assets/javascripts/jquery/ui/jquery.ui.draggable.js",
                    "assets/javascripts/jquery/ui/jquery.ui.position.js",
                    "assets/javascripts/jquery/ui/jquery.ui.dialog.js",
                    "assets/javascripts/users.js"
                ],
                "css": [
                    "assets/stylesheets/base.css",
                    "assets/stylesheets/jquery/ui/themes/base/jquery.ui.core.css",
                    "assets/stylesheets/jquery/ui/themes/base/jquery.ui.theme.css",
                    "assets/stylesheets/jquery/ui/themes/base/jquery.ui.button.css",
                    "assets/stylesheets/jquery/ui/themes/base/jquery.ui.dialog.css"
                ],
                "dest": {
                    "javascript": "build/javascripts/users-min_59b7709b2325fca2ce881c79151c05a9.js",
                    "css": "build/stylesheets/users-min_6ce13c9e392baf3fd9484138f786976e.css"
                }
            }
        };

    describe('#parse()', function() {
        it('should equality', function() {
            resource.parse().should.eql(resources);
        })
    });

    describe('#save()', function() {
        resource.save();

        describe('Read file __dirname + "/../../rbuild.lock"', function() {
            it('should equality', function() {
                JSON.parse(
                    fs.readFileSync(__dirname + '/../../rbuild.lock'
                ).toString()).should.eql(resources);
            });
        });
    });
});