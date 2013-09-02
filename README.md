# resource_build

This is a tool make easier to concat and compress the javascript & css files

## Installing

```shell
 $ npm install -g resource_build
```

## Getting started

Create .rbuildrc in your application root directory:

```
{
    "path": {
        "build": {
            "javascript": "build/javascripts",
            "css": "build/stylesheets"
        },
        "components_config": "configs/components.json"
        "resources_config": "configs/resources",
        "static_root": "assets"
    },
    "prefix": {
        "resources_key": "controllers",
        "resources_css": "assets/stylesheets"
        "resources_javascript": "assets/javascripts"
    }
}

```

>- The components_config should be a json file, but resources_config can be either a json file or a directory,
you can see the example in [tests/configs](https://github.com/NanJingBoy/resource_build/tree/master/tests/configs)

>- The static_root is root static directory in your application

>- The resources_key is the key of resource prefix(e.g. a resource key is named user@index, the full key is should be
controllers/user@index)

>- The resources_css & resources_javascript are the source file path prefix(e.g. a resource file path is defined home.js,
the full path is should be assets/javascripts/home.js)

>- In resources configs, you may found a special key named 'global', it means the resources would be loaded in every page(e.g. [tests/configs/resources/global.json](https://github.com/NanJingBoy/resource_build/blob/master/tests/configs/resources/global.json))


### Usage Examples
You can see a simple example in [tests](https://github.com/NanJingBoy/resource_build/tree/master/tests)


## Usage
```shell
  $ rbuild -h

  Usage: rbuild [options]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -c, --config   set config file
    -f, --force    build file even it exists
    -i, --ignore   unnecessary to create rbuild.lock file in application root directory
    -r, --replace  replace urls in css files with absolute path
```

## Contributors
>- [superbug](https://github.com/superbug)

## License
>- [MIT](http://www.opensource.org/licenses/MIT)

## Release History
_2013-09-02   v0.0.7   Fix error when not defined the css in components config_

_2013-09-02   v0.0.5   Update rbuild.lock format in application root_

_2013-08-30   v0.0.3   Improve the tool to replace urls in css files with absolute path_

_2013-08-28   v0.0.1   Release the first version_


