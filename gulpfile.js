"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var sourcemaps = require('gulp-sourcemaps');
var server = require("browser-sync").create();
var webp = require('gulp-webp');

gulp.task("css", function () {
  return gulp.src("source/sass/main.scss")
    .pipe(plumber())
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("css", "server"));

gulp.task('webp', function () {
  return gulp.src('source/img/*.{jpg,png}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('source/img/'))
});
