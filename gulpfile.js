/*jslint node: true, white: true */
(function() {
  "use strict";

  var gulp = require('gulp-help')(require('gulp')),
      gutil = require('gulp-util'),
      plumber = require('gulp-plumber'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      stylus = require('gulp-stylus'),
      jade = require('gulp-jade'),
      webserver = require('gulp-webserver'),
      // vary = require('vary'),
      cors = require('cors');

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
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('watch', ['styles', 'style-guide'], function() {
    gulp.watch('./styles/**/*.styl', ['styles']);
    gulp.watch('./style-guide/**/*.jade', ['style-guide']);
  });

  gulp.task('serve', function() {
    gulp.src('.')
      .pipe(webserver({
        livereload: true,
        directoryListing: true,
        open: 'http://localhost:8000/dist/style-guide/index.html',
        middleware: [cors()]
      }));
  });

  gulp.task('default', ['watch']);
}());
