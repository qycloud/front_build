var mocha = require('mocha'),
    should = require('should'),
    Component = require('../../../lib/parser/component');

describe('Component(__dirname + "/../../configs/components.json")', function() {
    var components = {
            "jquery": {
                "javascript": ["jquery/jquery.js"],
                "css": []
            },

            "jquery_ui_core": {
                "javascript": [
                    "jquery/jquery.js",
                    "jquery/ui/jquery.ui.core.js"
                ],
                "css": [
                    "jquery/ui/themes/base/jquery.ui.core.css",
                    "jquery/ui/themes/base/jquery.ui.theme.css"
                ]
            },

            "jquery_ui_mouse": {
                "javascript": [
                    "jquery/jquery.js",
                    "jquery/ui/jquery.ui.core.js",
                    "jquery/ui/jquery.ui.widget.js",
                    "jquery/ui/jquery.ui.mouse.js"
                ],
                "css": [
                    "jquery/ui/themes/base/jquery.ui.core.css",
                    "jquery/ui/themes/base/jquery.ui.theme.css"
                ]
            },

            "jquery_ui_button": {
                "javascript": [
                    "jquery/jquery.js",
                    "jquery/ui/jquery.ui.core.js",
                    "jquery/ui/jquery.ui.widget.js",
                    "jquery/ui/jquery.ui.mouse.js",
                    "jquery/ui/jquery.ui.button.js"
                ],
                "css": [
                    "jquery/ui/themes/base/jquery.ui.core.css",
                    "jquery/ui/themes/base/jquery.ui.theme.css",
                    "jquery/ui/themes/base/jquery.ui.button.css"
                ]
            },

            "jquery_ui_dialog": {
                "javascript": [
                    "jquery/jquery.js",
                    "jquery/ui/jquery.ui.core.js",
                    "jquery/ui/jquery.ui.widget.js",
                    "jquery/ui/jquery.ui.mouse.js",
                    "jquery/ui/jquery.ui.button.js",
                    "jquery/ui/jquery.ui.draggable.js",
                    "jquery/ui/jquery.ui.position.js",
                    "jquery/ui/jquery.ui.dialog.js"
                ],
                "css": [
                    "jquery/ui/themes/base/jquery.ui.core.css",
                    "jquery/ui/themes/base/jquery.ui.theme.css",
                    "jquery/ui/themes/base/jquery.ui.button.css",
                    "jquery/ui/themes/base/jquery.ui.dialog.css"
                ]
            }
        },
        component = new Component(__dirname + '/../../configs/components.json');

    describe('#parse()', function() {
        it('should equality', function() {
            component.parse().should.eql(components);
        });
    });

    describe('#parse("jquery_ui_dialog")', function() {
        it('should equality', function() {
            component.parse('jquery_ui_dialog').should.eql(components['jquery_ui_dialog']);
        });
    });
});
