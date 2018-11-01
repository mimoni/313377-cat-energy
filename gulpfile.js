"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var webp = require("gulp-webp");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var del = require("del");
var htmlmin = require('gulp-htmlmin');

gulp.task("css", function () {
  return gulp.src("source/sass/main.scss")
    .pipe(plumber())
    .pipe(sass({
      includePaths: require("node-normalize-scss").includePaths
    }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("css:build", function () {
  return gulp.src("source/sass/main.scss")
    .pipe(plumber())
    .pipe(sass({
      includePaths: require("node-normalize-scss").includePaths
    }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(gulp.dest("build/css"))
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

gulp.task("webp", function () {
  return gulp.src("source/img/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img/"))
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img/"))
});

gulp.task("clean", function () {
  return del("build/**", {force: true});
});

gulp.task("html", function () {
  return gulp.src('source/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/js/**/*.js",
    "source/img/**/*.webp"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task('build',
  gulp.series('clean', gulp.parallel("images", "copy", "html", "css:build")));
