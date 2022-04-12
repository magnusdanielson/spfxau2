'use strict';
const gulp = require('gulp');
const au2gulp = require('@aurelia/plugin-gulp').default;
const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

let aureliaGulpConventionSubTask = build.subTask('aurelia-gulp-subtask', function(gulp, buildOptions, done) {
  gulp.src('./src/**/*.ts')
  .pipe(au2gulp()).pipe(gulp.dest("autemp")).on('finish', ()=>
  {
    gulp.src('src/**/*.html')
    .pipe(au2gulp()).pipe(gulp.dest("lib")).on('finish', () => done());
  });  
});
let aureliaConvention = build.task('aurelia-convention', aureliaGulpConventionSubTask);
aureliaConvention.getCleanMatch = (config) =>
{
  return ['autemp'];
};
build.rig.addPreBuildTask(aureliaConvention);

build.initialize(gulp);

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    //generatedConfiguration.module.rules.splice(4,1);

    // Remove .html rule, generally with index 4
    var filtered = generatedConfiguration.module.rules.filter(function(rule, index, arr)
    { 
      if(typeof rule.test.source == "string")
      {
        if(rule.test.source.includes('.html'))
        {
          return true
        }
      }
      return false;
    });

    filtered.forEach( (rule)=>
    {
      var index = generatedConfiguration.module.rules.indexOf(rule);
      generatedConfiguration.module.rules.splice(index,1);
    });

    return generatedConfiguration;
  }

});