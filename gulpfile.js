'use strict';
const through = require('through2')
const gulp = require('gulp');

var pluginConventions = require('@aurelia/plugin-conventions');
const build = require('@microsoft/sp-build-web');
const path = require('path');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};



let bumpRevisionSubTask = build.subTask('bump-revision-subtask', function(gulp, buildOptions, done) {

  const options = {};
  /*
options
{}
  */
 

  const _preprocess = pluginConventions.preprocess;

  //resourcePath
//C:\GitProjects\spfxau2\lib\webparts\helloWorld\HelloWorldWebPart.js

  
  // var pkgSolution = getJson('./config/package-solution.json');
  // var oldVersionNumber = String(pkgSolution.solution.version);
  // gutil.log('Old Version: ' + oldVersionNumber);
  // var oldBuildNumber = parseInt(oldVersionNumber.split('.')[3]);
  // gutil.log('Old Build Number: ' + oldBuildNumber);
  // var newBuildNumber = oldBuildNumber+1;
  // gutil.log('New Build Number: ' + newBuildNumber);
  // var newVersionNumber = oldVersionNumber.substring(0, String(oldVersionNumber).length - String(oldBuildNumber).length) + String(newBuildNumber);
  // gutil.log('New Version: ' + newVersionNumber);
  // pkgSolution.solution.version = newVersionNumber;
  // fs.writeFile('./config/package-solution.json', JSON.stringify(pkgSolution, null, 4));


  return gulp.src('./src/**/*.*')
  .pipe(through.obj((file, enc, cb) => {
    //console.log('chunk', file); // this should log now

    if(file.path.endsWith('.ts'))
    {
      var result = _preprocess({ path: file.path, contents: file.contents.toString() }, pluginConventions.preprocessOptions(options || {}));
      console.log(file.path);
    // result.code
    // result.map
      file.contents = Buffer.from( result.code);
    }
    
    cb(null, file)
  }))
  .pipe(gulp.dest("./autemp"));

});

let bumpRevisionTask = build.task('bump-revision', bumpRevisionSubTask);

build.rig.addPreBuildTask(bumpRevisionTask);

build.initialize(gulp);


// This is the configuration I have added to adapt for Aurelia
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {

    //console.log(generatedConfiguration.module.rules[4]);
    // remove the existing -html loader
  //   generatedConfiguration.module.rules.splice(5,1);
  //   generatedConfiguration.module.rules.splice(4,1);


   
  //   var rule2 = { test: /[/\\]dist[/\\].+\.js$/i, use: [
  //     {
  //     loader: "inspect-loader",
  //     options: {
  //         callback(inspect) {
  //              console.log(inspect.arguments);
  //              console.log(inspect.context);
  //              console.log(inspect.options);
  //         }
  //     }
  // },
  //  '@aurelia/webpack-loader'], exclude: /node_modules/ };
  //   generatedConfiguration.module.rules.push(rule2);

  //   var rule1 = { test: /\.html$/i, use:[
  //     {
  //     loader: "inspect-loader",
  //     options: {
  //         callback(inspect) {
  //              console.log(inspect.arguments);
  //              console.log(inspect.context);
  //              console.log(inspect.options);
  //         }
  //     }
  // }, 
  // '@aurelia/webpack-loader'], exclude: /node_modules/ } ;
  //   generatedConfiguration.module.rules.push(rule1);

  // var rule4 = {
  //   test: /\.js$/,
  //   use: [
  //     {
  //       loader: path.resolve('path/to/loader.js'),
  //       options: {
  //         /* ... */
  //       },
  //     },
  //   ],
  // };
    

    // var rule3 = { test: /\.js$/i, use: ['ts-loader','@aurelia/webpack-loader'], exclude: /node_modules/  };
    // generatedConfiguration.module.rules.push(rule3);

    //generatedConfiguration.module.rules.forEach( v => console.log(v));

    //console.log(generatedConfiguration);
    return generatedConfiguration;
  }
});