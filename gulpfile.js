'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(require('gulp'));

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    console.log(generatedConfiguration);
    
    console.log("test");
    console.log(generatedConfiguration.module.rules[4]);

    generatedConfiguration.module.rules.splice(4,1);

    // [/\\]src[/\\].+
    var rule1 = { test:  /\.html$/i, use: '@aurelia/webpack-loader', exclude: /node_modules/} ;
    generatedConfiguration.module.rules.push(rule1)

    var rule2 = { test: /\.ts$/i, use: ['ts-loader', '@aurelia/webpack-loader'], exclude: /node_modules/  };
    generatedConfiguration.module.rules.push(rule2);

    generatedConfiguration.module.rules.forEach( v => console.log(v));

    
    return generatedConfiguration;
  }

});