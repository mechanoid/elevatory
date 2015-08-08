/*jslint node: true, white: true */
(function() {
  "use strict";

  var gulp = require('gulp-help')(require('gulp'))
    , gutil = require('gulp-util')
    , plumber = require('gulp-plumber')
    , jade = require('gulp-jade')

    // DEV WEBSERVER
    , webserver = require('gulp-webserver')
    , cors = require('cors')

    // MIXED
    , sourcemaps = require('gulp-sourcemaps')

    // POST CSS AND PLUGINS
    , postcss = require('gulp-postcss')
    , autoprefixer = require('autoprefixer')
    , mqpacker = require('css-mqpacker')
    , atImport = require('postcss-import')
    , cssvariables = require('postcss-css-variables')
    , cssmixins = require('postcss-mixins')
    , nestedcss = require('postcss-nested');

  gulp.task('style-guide', function() {
    gulp.src('./style-guide/**/*.jade')
      .pipe(jade({pretty: true, compileDebug: false, debug: false}).on('error', gutil.log))
      .pipe(gulp.dest('./dist/style-guide'));
  });

  gulp.task('styles', function () {
    var processors = [
      autoprefixer({browsers: ['last 1 version']})
      , mqpacker
      , atImport({glob: true})
      , cssvariables
      , cssmixins
      // remeber to claim nested css as last, to make other modules in it work.
      , nestedcss
    ];

    gulp.src('./styles/*.css')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(postcss(processors).on('error', gutil.log))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('watch', ['styles', 'style-guide'], function() {
    gulp.watch('./styles/**/*.css', ['styles']);
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

  gulp.task('default', ['watch', 'serve']);
}());
