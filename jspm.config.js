SystemJS.config({
  transpiler: "plugin-babel",
  trace: true,
  packages: {
    "@ignavia/draph": {
      "main": "draph.js",
      "format": "esm",
      "defaultExtension": "js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel",
          "babelOptions": {
            "plugins": [
              "babel-plugin-transform-export-extensions"
            ],
            "presets": [
              "babel-preset-stage-0"
            ]
          }
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "lodash": "npm:lodash@4.11.1",
    "babel-plugin-transform-export-extensions": "npm:babel-plugin-transform-export-extensions@6.5.0",
    "@ignavia/util": "npm:@ignavia/util@1.2.4",
    "@ignavia/earl": "npm:@ignavia/earl@1.2.2",
    "@ignavia/ella": "npm:@ignavia/ella@1.0.15",
    "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
    "babel-preset-stage-0": "npm:babel-preset-stage-0@6.5.0",
    "babel-regenerator-runtime": "npm:babel-regenerator-runtime@6.5.0",
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
    "core-js": "npm:core-js@1.2.6",
    "events": "github:jspm/nodelibs-events@0.2.0-alpha",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "jquery": "npm:jquery@2.2.3",
    "jquery-mousewheel": "npm:jquery-mousewheel@3.1.13",
    "module": "github:jspm/nodelibs-module@0.2.0-alpha",
    "net": "github:jspm/nodelibs-net@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "pixi.js": "npm:pixi.js@3.0.10",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.8",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "source-map": "npm:source-map@0.1.43",
    "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
    "systemjs-hot-reloader": "github:capaj/systemjs-hot-reloader@0.5.7",
    "tty": "github:jspm/nodelibs-tty@0.2.0-alpha",
    "url": "github:jspm/nodelibs-url@0.2.0-alpha",
    "util": "github:jspm/nodelibs-util@0.2.0-alpha",
    "vm": "github:jspm/nodelibs-vm@0.2.0-alpha"
  },
  packages: {
    "github:capaj/systemjs-hot-reloader@0.5.7": {
      "map": {
        "debug": "npm:debug@2.2.0",
        "socket.io-client": "github:socketio/socket.io-client@1.4.5",
        "weakee": "npm:weakee@1.0.0"
      }
    },
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.5.1"
      }
    },
    "github:jspm/nodelibs-stream@0.2.0-alpha": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "github:jspm/nodelibs-url@0.2.0-alpha": {
      "map": {
        "url-browserify": "npm:url@0.11.0"
      }
    },
    "npm:@ignavia/earl@1.2.2": {
      "map": {
        "@ignavia/util": "npm:@ignavia/util@1.2.4",
        "babel-regenerator-runtime": "npm:babel-regenerator-runtime@6.5.0"
      }
    },
    "npm:@ignavia/util@1.2.4": {
      "map": {
        "lodash": "npm:lodash@4.11.1"
      }
    },
    "npm:ansi-styles@2.2.0": {
      "map": {
        "color-convert": "npm:color-convert@1.0.0"
      }
    },
    "npm:babel-code-frame@6.7.2": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "chalk": "npm:chalk@1.1.1",
        "esutils": "npm:esutils@2.0.2",
        "js-tokens": "npm:js-tokens@1.0.2",
        "line-numbers": "npm:line-numbers@0.2.0",
        "repeating": "npm:repeating@1.1.3"
      }
    },
    "npm:babel-helper-bindify-decorators@6.6.5": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-traverse": "npm:babel-traverse@6.7.3",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-helper-builder-binary-assignment-operator-visitor@6.6.5": {
      "map": {
        "babel-helper-explode-assignable-expression": "npm:babel-helper-explode-assignable-expression@6.6.5",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-helper-define-map@6.6.5": {
      "map": {
        "babel-helper-function-name": "npm:babel-helper-function-name@6.6.0",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2",
        "lodash": "npm:lodash@3.10.1"
      }
    },
    "npm:babel-helper-explode-assignable-expression@6.6.5": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-traverse": "npm:babel-traverse@6.7.3",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-helper-explode-class@6.6.5": {
      "map": {
        "babel-helper-bindify-decorators": "npm:babel-helper-bindify-decorators@6.6.5",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-traverse": "npm:babel-traverse@6.7.3",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-helper-function-name@6.6.0": {
      "map": {
        "babel-helper-get-function-arity": "npm:babel-helper-get-function-arity@6.6.5",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-template": "npm:babel-template@6.7.0",
        "babel-traverse": "npm:babel-traverse@6.7.3",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-helper-get-function-arity@6.6.5": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-helper-remap-async-to-generator@6.7.0": {
      "map": {
        "babel-helper-function-name": "npm:babel-helper-function-name@6.6.0",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-template": "npm:babel-template@6.7.0",
        "babel-traverse": "npm:babel-traverse@6.7.3",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-messages@6.7.2": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-async-functions@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-class-constructor-call@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-class-properties@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-decorators@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-do-expressions@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-exponentiation-operator@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-export-extensions@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-function-bind@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-object-rest-spread@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-trailing-function-commas@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-async-to-generator@6.7.0": {
      "map": {
        "babel-helper-remap-async-to-generator": "npm:babel-helper-remap-async-to-generator@6.7.0",
        "babel-plugin-syntax-async-functions": "npm:babel-plugin-syntax-async-functions@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-class-constructor-call@6.6.5": {
      "map": {
        "babel-plugin-syntax-class-constructor-call": "npm:babel-plugin-syntax-class-constructor-call@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-template": "npm:babel-template@6.7.0"
      }
    },
    "npm:babel-plugin-transform-class-properties@6.6.0": {
      "map": {
        "babel-plugin-syntax-class-properties": "npm:babel-plugin-syntax-class-properties@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-decorators@6.6.5": {
      "map": {
        "babel-helper-define-map": "npm:babel-helper-define-map@6.6.5",
        "babel-helper-explode-class": "npm:babel-helper-explode-class@6.6.5",
        "babel-plugin-syntax-decorators": "npm:babel-plugin-syntax-decorators@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-template": "npm:babel-template@6.7.0",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-plugin-transform-do-expressions@6.5.0": {
      "map": {
        "babel-plugin-syntax-do-expressions": "npm:babel-plugin-syntax-do-expressions@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-exponentiation-operator@6.5.0": {
      "map": {
        "babel-helper-builder-binary-assignment-operator-visitor": "npm:babel-helper-builder-binary-assignment-operator-visitor@6.6.5",
        "babel-plugin-syntax-exponentiation-operator": "npm:babel-plugin-syntax-exponentiation-operator@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-export-extensions@6.5.0": {
      "map": {
        "babel-plugin-syntax-export-extensions": "npm:babel-plugin-syntax-export-extensions@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-function-bind@6.5.2": {
      "map": {
        "babel-plugin-syntax-function-bind": "npm:babel-plugin-syntax-function-bind@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-object-rest-spread@6.6.5": {
      "map": {
        "babel-plugin-syntax-object-rest-spread": "npm:babel-plugin-syntax-object-rest-spread@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-preset-stage-0@6.5.0": {
      "map": {
        "babel-plugin-transform-do-expressions": "npm:babel-plugin-transform-do-expressions@6.5.0",
        "babel-plugin-transform-function-bind": "npm:babel-plugin-transform-function-bind@6.5.2",
        "babel-preset-stage-1": "npm:babel-preset-stage-1@6.5.0"
      }
    },
    "npm:babel-preset-stage-1@6.5.0": {
      "map": {
        "babel-plugin-transform-class-constructor-call": "npm:babel-plugin-transform-class-constructor-call@6.6.5",
        "babel-plugin-transform-class-properties": "npm:babel-plugin-transform-class-properties@6.6.0",
        "babel-plugin-transform-decorators": "npm:babel-plugin-transform-decorators@6.6.5",
        "babel-plugin-transform-export-extensions": "npm:babel-plugin-transform-export-extensions@6.5.0",
        "babel-preset-stage-2": "npm:babel-preset-stage-2@6.5.0"
      }
    },
    "npm:babel-preset-stage-2@6.5.0": {
      "map": {
        "babel-plugin-syntax-trailing-function-commas": "npm:babel-plugin-syntax-trailing-function-commas@6.5.0",
        "babel-plugin-transform-object-rest-spread": "npm:babel-plugin-transform-object-rest-spread@6.6.5",
        "babel-preset-stage-3": "npm:babel-preset-stage-3@6.5.0"
      }
    },
    "npm:babel-preset-stage-3@6.5.0": {
      "map": {
        "babel-plugin-transform-async-to-generator": "npm:babel-plugin-transform-async-to-generator@6.7.0",
        "babel-plugin-transform-exponentiation-operator": "npm:babel-plugin-transform-exponentiation-operator@6.5.0"
      }
    },
    "npm:babel-runtime@5.8.38": {
      "map": {
        "core-js": "npm:core-js@1.2.6"
      }
    },
    "npm:babel-template@6.7.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-traverse": "npm:babel-traverse@6.7.3",
        "babel-types": "npm:babel-types@6.7.2",
        "babylon": "npm:babylon@6.7.0",
        "lodash": "npm:lodash@3.10.1"
      }
    },
    "npm:babel-traverse@6.7.3": {
      "map": {
        "babel-code-frame": "npm:babel-code-frame@6.7.2",
        "babel-messages": "npm:babel-messages@6.7.2",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2",
        "babylon": "npm:babylon@6.7.0",
        "debug": "npm:debug@2.2.0",
        "globals": "npm:globals@8.18.0",
        "invariant": "npm:invariant@2.2.1",
        "lodash": "npm:lodash@3.10.1",
        "repeating": "npm:repeating@1.1.3"
      }
    },
    "npm:babel-types@6.7.2": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-traverse": "npm:babel-traverse@6.7.3",
        "esutils": "npm:esutils@2.0.2",
        "lodash": "npm:lodash@3.10.1",
        "to-fast-properties": "npm:to-fast-properties@1.0.1"
      }
    },
    "npm:babylon@6.7.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:brfs@1.4.3": {
      "map": {
        "quote-stream": "npm:quote-stream@1.0.2",
        "resolve": "npm:resolve@1.1.7",
        "static-module": "npm:static-module@1.3.0",
        "through2": "npm:through2@2.0.1"
      }
    },
    "npm:browserify-versionify@1.0.6": {
      "map": {
        "find-root": "npm:find-root@0.1.2",
        "through2": "npm:through2@0.6.3"
      }
    },
    "npm:buffer@4.5.1": {
      "map": {
        "base64-js": "npm:base64-js@1.1.2",
        "ieee754": "npm:ieee754@1.1.6",
        "isarray": "npm:isarray@1.0.0"
      }
    },
    "npm:chalk@1.1.1": {
      "map": {
        "ansi-styles": "npm:ansi-styles@2.2.0",
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
        "has-ansi": "npm:has-ansi@2.0.0",
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "supports-color": "npm:supports-color@2.0.0"
      }
    },
    "npm:concat-stream@1.4.10": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@1.1.13",
        "typedarray": "npm:typedarray@0.0.6"
      }
    },
    "npm:debug@2.2.0": {
      "map": {
        "ms": "npm:ms@0.7.1"
      }
    },
    "npm:duplexer2@0.0.2": {
      "map": {
        "readable-stream": "npm:readable-stream@1.1.13"
      }
    },
    "npm:escodegen@0.0.28": {
      "map": {
        "esprima": "npm:esprima@1.0.4",
        "estraverse": "npm:estraverse@1.3.2"
      }
    },
    "npm:escodegen@1.3.3": {
      "map": {
        "esprima": "npm:esprima@1.1.1",
        "estraverse": "npm:estraverse@1.5.1",
        "esutils": "npm:esutils@1.0.0"
      }
    },
    "npm:falafel@1.2.0": {
      "map": {
        "acorn": "npm:acorn@1.2.2",
        "foreach": "npm:foreach@2.0.5",
        "isarray": "npm:isarray@0.0.1",
        "object-keys": "npm:object-keys@1.0.9"
      }
    },
    "npm:has-ansi@2.0.0": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:has@1.0.1": {
      "map": {
        "function-bind": "npm:function-bind@1.1.0"
      }
    },
    "npm:invariant@2.2.1": {
      "map": {
        "loose-envify": "npm:loose-envify@1.1.0"
      }
    },
    "npm:is-finite@1.0.1": {
      "map": {
        "number-is-nan": "npm:number-is-nan@1.0.0"
      }
    },
    "npm:line-numbers@0.2.0": {
      "map": {
        "left-pad": "npm:left-pad@0.0.3"
      }
    },
    "npm:loose-envify@1.1.0": {
      "map": {
        "js-tokens": "npm:js-tokens@1.0.2"
      }
    },
    "npm:pixi.js@3.0.10": {
      "map": {
        "async": "npm:async@1.5.2",
        "brfs": "npm:brfs@1.4.3",
        "browserify-versionify": "npm:browserify-versionify@1.0.6",
        "earcut": "npm:earcut@2.1.1",
        "eventemitter3": "npm:eventemitter3@1.2.0",
        "object-assign": "npm:object-assign@4.0.1",
        "resource-loader": "npm:resource-loader@1.6.4"
      }
    },
    "npm:quote-stream@0.0.0": {
      "map": {
        "minimist": "npm:minimist@0.0.8",
        "through2": "npm:through2@0.4.2"
      }
    },
    "npm:quote-stream@1.0.2": {
      "map": {
        "buffer-equal": "npm:buffer-equal@0.0.1",
        "minimist": "npm:minimist@1.2.0",
        "through2": "npm:through2@2.0.1"
      }
    },
    "npm:readable-stream@1.0.33": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@0.0.1",
        "stream-browserify": "npm:stream-browserify@1.0.0",
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:readable-stream@1.1.13": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@0.0.1",
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:readable-stream@2.0.6": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@1.0.0",
        "process-nextick-args": "npm:process-nextick-args@1.0.6",
        "string_decoder": "npm:string_decoder@0.10.31",
        "util-deprecate": "npm:util-deprecate@1.0.2"
      }
    },
    "npm:repeating@1.1.3": {
      "map": {
        "is-finite": "npm:is-finite@1.0.1"
      }
    },
    "npm:resource-loader@1.6.4": {
      "map": {
        "async": "npm:async@0.9.2",
        "eventemitter3": "npm:eventemitter3@1.2.0"
      }
    },
    "npm:source-map@0.1.43": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0"
      }
    },
    "npm:static-eval@0.2.4": {
      "map": {
        "escodegen": "npm:escodegen@0.0.28"
      }
    },
    "npm:static-module@1.3.0": {
      "map": {
        "concat-stream": "npm:concat-stream@1.4.10",
        "duplexer2": "npm:duplexer2@0.0.2",
        "escodegen": "npm:escodegen@1.3.3",
        "falafel": "npm:falafel@1.2.0",
        "has": "npm:has@1.0.1",
        "object-inspect": "npm:object-inspect@0.4.0",
        "quote-stream": "npm:quote-stream@0.0.0",
        "readable-stream": "npm:readable-stream@1.0.33",
        "shallow-copy": "npm:shallow-copy@0.0.1",
        "static-eval": "npm:static-eval@0.2.4",
        "through2": "npm:through2@0.4.2"
      }
    },
    "npm:stream-browserify@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@1.0.33"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@2.0.6"
      }
    },
    "npm:strip-ansi@3.0.1": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:through2@0.4.2": {
      "map": {
        "readable-stream": "npm:readable-stream@1.0.33",
        "xtend": "npm:xtend@2.1.2"
      }
    },
    "npm:through2@0.6.3": {
      "map": {
        "readable-stream": "npm:readable-stream@1.0.33",
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:through2@2.0.1": {
      "map": {
        "readable-stream": "npm:readable-stream@2.0.6",
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:xtend@2.1.2": {
      "map": {
        "object-keys": "npm:object-keys@0.4.0"
      }
    }
  }
});
