var fs = require('fs'),
    mocha = require('mocha'),
    should = require('should'),
    Resource = require('../../../lib/parser/resource');

describe('Resource(__dirname + "/../../.rbuildrc")', function() {
    var resource = new Resource(__dirname + '/../../.rbuildrc');

    describe('#parse()', function() {
        var resources = {
            "controllers/global": {
                "javascript": [
                    "assets/javascripts/jquery/jquery.js"
                ],
                "css": [
                    "assets/stylesheets/base.css",
                ],
                "dest": {
                    "javascript": "build/javascripts/controllers_global_86f59d2bf53ead28bb17d875580aad7d.js",
                    "css": "build/stylesheets/controllers_global_3a327ad1c7a3fca9bd542f2265b8b4cf.css"
                }
            },
            "controllers/home@index": {
                "javascript": [
                    "assets/javascripts/home.js"
                ],
                "css": [],
                "dest": {
                    "javascript": "build/javascripts/home-min_c23cd22a0646427b9589dae6e22e95e5.js",
                    "css": null
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
                    "javascript": "build/javascripts/users-min_5990e59a33a6bea0583a9bcbf97ffa41.js",
                    "css": "build/stylesheets/users-min_cb301970e7a05a9318b269b3556e452d.css"
                }
            }
        };

        it('should equality', function() {
            resource.parse().should.eql(resources);
        })
    });

    describe('#save()', function() {
        var resources = {
            "controllers/global": {
                "javascript": "build/javascripts/controllers_global_86f59d2bf53ead28bb17d875580aad7d.js",
                "css": "build/stylesheets/controllers_global_3a327ad1c7a3fca9bd542f2265b8b4cf.css"
            },
            "controllers/home@index": {
                "javascript": "build/javascripts/home-min_c23cd22a0646427b9589dae6e22e95e5.js",
                "css": null
            },
            "controllers/users@index": {
                "javascript": "build/javascripts/users-min_5990e59a33a6bea0583a9bcbf97ffa41.js",
                "css": "build/stylesheets/users-min_cb301970e7a05a9318b269b3556e452d.css"
            }
        };

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