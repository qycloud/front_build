var mocha = require('mocha'),
    should = require('should'),
    Resource = require('../../../lib/parser/resource');

describe('Resource(__dirname + "/../../.buildrc")', function() {
    var resource = new Resource(__dirname + '/../../.buildrc');

    describe('#getConfigs()', function() {
        var configs = {
            "home@index": {
                "javascript": [
                    "res:jquery",
                    "home.js"
                ],
                "css": ["base.css"],
                "dest_prefix": "home-min"
            },
            "users@index": {
                "javascript": [
                    "res:jquery",
                    "res:jquery_ui_dialog",
                    "users.js"
                ],
                "css": [
                    "base.css",
                    "res:jquery_ui_dialog"
                ],
                "dest_prefix": "users-min"
            }
        };

        it('should equality', function() {
            resource.getConfigs().should.eql(configs);
        });
    });

    describe('#parse()', function() {
        var resources = {
            "controllers/home@index": {
                "javascript": [
                    "assets/javascripts/jquery/jquery.js",
                    "assets/javascripts/home.js"
                ],
                "css": [
                    "assets/stylesheets/base.css",
                ],
                "dest": {
                    "javascript": "home-min_1b6316803455be0c0bdbe08fd52c44b5.js",
                    "css": "home-min_15a63a0c6a738eb8de8e823d2b5aafda.css"
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
                    "javascript": "users-min_f9681fdf76cf085a6c5b2295112398de.js",
                    "css": "users-min_48d508549dffd696499a5173ef898c13.css"
                }
            }
        };

        it('should equality', function() {
            resource.parse().should.eql(resources);
        })
    });
});