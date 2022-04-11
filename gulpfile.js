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



let aureliaConventionSubTask = build.subTask('aurelia-convention-subtask', function(gulp, buildOptions, done) {

  const options = {};
 

  const _preprocess = pluginConventions.preprocess;
  return gulp.src('./src/**/*.*')
  .pipe(through.obj((file, enc, cb) => {
    if(file.path.endsWith('.ts'))
    {
      var result = _preprocess({ path: file.path, contents: file.contents.toString() }, pluginConventions.preprocessOptions(options || {}));
      //console.log(file.path);
    // result.code
    // result.map
      file.contents = Buffer.from( result.code);
    }
    cb(null, file)
  })).pipe(gulp.dest("autemp"));
});

let aureliaConvention = build.task('aurelia-convention', aureliaConventionSubTask);

build.rig.addPreBuildTask(aureliaConvention);

build.initialize(require('gulp'));
