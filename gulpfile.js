/*jslint node: true, white: true */
(function() {
  "use strict";

  var gulp = require('gulp'),
      gutil = require('gulp-util'),
      plumber = require('gulp-plumber'),
      sourcemaps = require('gulp-sourcemaps'),
      stylus = require('gulp-stylus'),
      jade = require('gulp-jade');

  gulp.task('style_guide', function() {
    gulp.src('./style_guide/**/*.jade')
      .pipe(jade({pretty: true, compileDebug: false, debug: false}).on('error', gutil.log))
      .pipe(gulp.dest('./dist/style_guide'));
  });

  gulp.task('styles', function () {
    gulp.src('./styles/*.styl')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(stylus().on('error', gutil.log))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('watch', ['styles', 'style_guide'], function() {
    gulp.watch('./styles/**/*.style', ['styles']);
    gulp.watch('./styleguide/**/*', ['style_guide']);
  });

  gulp.task('default', ['watch']);
}());
