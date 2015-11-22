var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var header = require('gulp-header');
var footer = require('gulp-footer');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var fs = require('fs');

var config = {
  pkg: JSON.parse(fs.readFileSync('./package.json')),
  banner:
  '/*!\n' +
  ' * <%= pkg.name %>\n' +
  ' * <%= pkg.author %>\n' +
  ' * Version: <%= pkg.version %> - <%= timestamp %>\n' +
  ' * License: <%= pkg.license %>\n' +
  ' */\n\n\n',
};

var path = {
  dist: 'www/dist/',
  src: {
    js: ['www/src/app.js', 'www/src/**/*.js'],
    style: ['www/src/**/*.scss', './scss/**/*.scss'],
    img: 'www/src/img/**/*.*',
    fonts: 'www/src/fonts'
  }
};

var tasks = {

  sass: function (done) {
    gulp.src(path.src.style)
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(concat('style.' + config.pkg.version))
      .pipe(minifyCss({
        keepSpecialComments: 0
      }))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest(path.dist))
      .on('end', done);
  },

  js: function (done) {

    gulp.src(path.src.js)
      .pipe(concat('app.min.js'))
      .pipe(header(config.banner + '(function () { \n"use strict";\n\n', {
        timestamp: (new Date()).toISOString(),
        pkg: config.pkg
      }))
      .pipe(footer('\n}).call(this);'))
      .pipe(gulp.dest(path.dist))
      .on('end', done);
  }

};

gulp.task('sass', tasks.sass);
gulp.task('js', tasks.js);

gulp.task('default', ['sass', 'js']);

gulp.task('watch', function () {
  gulp.watch(path.src.style, ['sass']);
  gulp.watch(path.src.js, ['js']);
});

gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function (done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
      );
    process.exit(1);
  }
  done();
});
