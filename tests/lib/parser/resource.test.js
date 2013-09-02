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
                    "javascript": "build/javascripts/controllers_global_5ae2d350ecf717e5a0b812b044f33f87.js",
                    "css": "build/stylesheets/controllers_global_b3a53237d687702e50edd770aa5c6b61.css"
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
                    "javascript": "build/javascripts/home-min_1b6316803455be0c0bdbe08fd52c44b5.js",
                    "css": "build/stylesheets/home-min_b3a53237d687702e50edd770aa5c6b61.css"
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
                    "javascript": "build/javascripts/users-min_f9681fdf76cf085a6c5b2295112398de.js",
                    "css": "build/stylesheets/users-min_a6c13606db951a8814c614c61eb3e2db.css"
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
                "javascript": "build/javascripts/controllers_global_5ae2d350ecf717e5a0b812b044f33f87.js",
                "css": "build/stylesheets/controllers_global_b3a53237d687702e50edd770aa5c6b61.css"
            },
            "controllers/home@index": {
                "javascript": "build/javascripts/home-min_1b6316803455be0c0bdbe08fd52c44b5.js",
                "css": "build/stylesheets/home-min_b3a53237d687702e50edd770aa5c6b61.css"
            },
            "controllers/users@index": {
                "javascript": "build/javascripts/users-min_f9681fdf76cf085a6c5b2295112398de.js",
                "css": "build/stylesheets/users-min_a6c13606db951a8814c614c61eb3e2db.css"
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