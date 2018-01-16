/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var run = require('gulp-run');

gulp.task('default', ['npm', 'watch']);

gulp.task('npm', function () {
  return run('npm run build').exec();
});

gulp.task('watch', function () {
  gulp.watch('src/app/**/*.*', ['npm'])  
});



