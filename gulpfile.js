'use strict';

const build = require('@microsoft/sp-build-web');
const path = require('path');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(require('gulp'));


// This is the configuration I have added to adapt for Aurelia
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {

    console.log(generatedConfiguration.module.rules[4]);
    // remove the existing -html loader
    generatedConfiguration.module.rules.splice(4,1);

    var rule1 = { test: /\.html$/i, use: '@aurelia/webpack-loader', exclude: /node_modules/} ;
    generatedConfiguration.module.rules.push(rule1)

    var rule2 = { test: /\.ts$/i, use: ['ts-loader', '@aurelia/webpack-loader'], exclude: /node_modules/  };
    generatedConfiguration.module.rules.push(rule2);

    var rule3 = { test: /\.js$/i, use: ['@aurelia/webpack-loader'], exclude: /node_modules/  };
    generatedConfiguration.module.rules.push(rule3);


    generatedConfiguration.module.rules.forEach( v => console.log(v));

    console.log(generatedConfiguration);
    return generatedConfiguration;
  }
});