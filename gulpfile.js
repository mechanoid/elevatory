/*jslint node: true, white: true */
(function() {
  "use strict";

  var gulp = require('gulp'),
      gutil = require('gulp-util'),
      plumber = require('gulp-plumber'),
      sourcemaps = require('gulp-sourcemaps'),
      stylus = require('gulp-stylus'),
      jade = require('gulp-jade'),
      webserver = require('gulp-webserver');

  gulp.task('style-guide', function() {
    gulp.src('./style-guide/**/*.jade')
      .pipe(jade({pretty: true, compileDebug: false, debug: false}).on('error', gutil.log))
      .pipe(gulp.dest('./dist/style-guide'));
  });

  gulp.task('styles', function () {
    gulp.src('./styles/*.styl')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(stylus().on('error', gutil.log))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('watch', ['styles', 'style-guide'], function() {
    gulp.watch('./styles/**/*.style', ['styles']);
    gulp.watch('./style-guide/**/*', ['style-guide']);
  });

  gulp.task('serve', function() {
    gulp.src('dist')
      .pipe(webserver({
        livereload: true,
        directoryListing: true,
        open: 'http://localhost:8000/style-guide/index.html'
      }));
  });

  gulp.task('default', ['watch']);
}());
