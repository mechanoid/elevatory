/*jslint node: true, white: true */
(function() {
  "use strict";

  var gulp = require('gulp'),
      gutil = require('gulp-util'),
      plumber = require('gulp-plumber'),
      stylus = require('gulp-stylus');

  gulp.task('styles', function () {
    gulp.src('./styles/*')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(stylus().on('error', gutil.log))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/css'));
  });

  gulp.task('watch', ['styles'], function() {
    gulp.watch('./styles/**/*.style', ['styles']);
  });
}());
