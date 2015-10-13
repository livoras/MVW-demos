var gulp = require("gulp")
var less = require("gulp-less")
var watch = require("gulp-watch")
var gutil = require("gulp-util")
var del = require("del")
var browserify = require('gulp-browserify')
var livereload = require('gulp-livereload')
var connect = require('gulp-connect')
var rest = require('connect-rest')
var babelify = require("babelify")

var uglify = require('gulp-uglify')
var minifyHTML = require('gulp-minify-html')
var uglifycss = require ('gulp-uglifycss')
var mocks = require("./mocks")

var src = {
  root: "src",
  // 样式和逻辑都只编译入口文件
  styles: "src/styles/*.less",
  scripts: "src/scripts/*.js",
  html: "src/*.html"
}

var bin = {
  root: "bin",
  styles: "bin/styles",
  scripts: "bin/scripts",
  html: "bin"
}

var dist = {
  root: "dist",
  styles: "dist/styles",
  scripts: "dist/scripts",
  html: "dist"
}

function logError(err) {
  console.log(err)
}

/**
 * Default Gulp Task.
 */
gulp.task("default", [
  "clean",
  "copy",
  "html",
  "styles",
  "scripts",
  "connect",
  "test",
  "watch"
])

gulp.task("clean", function() {
  del.sync(bin.root)
})

gulp.task("copy", function() {
  gulp.src(["lib/**/*"])
    .pipe(gulp.dest(bin.root + "/lib"))
  gulp.src(["assets/**/*"])
    .pipe(gulp.dest(bin.root + "/assets"))
})

gulp.task("html", function() {
  gulp.src(src.html)
    .pipe(gulp.dest(bin.html))
    .on("end", reload)
})

gulp.task("styles", function() {
  gulp.src(src.styles)
    .pipe(less())
    .on("error", logError)
    .pipe(gulp.dest(bin.styles))
    .on("end", reload)
})

gulp.task("scripts", function() {
  gulp.src(src.scripts, {})
    .pipe(browserify({
      debug: true,
      transform: ["babelify", "brfs"]
    }))
    .on("error", logError)
    .pipe(gulp.dest(bin.scripts))
    .on("end", reload)
})

gulp.task("connect", function() {
  connect.server({
    root: bin.root,
    livereload: true,
    middleware: function(connect, opt) {
      return [rest.rester({
        context: "/"
      })]
    }
  })
  mocks(rest)
})

gulp.task("test", function() {
  console.log("should run test!..")
})

gulp.task("watch", function() {
  livereload.listen()
  gulp.watch(src.html, ["html"])
  gulp.watch("src/styles/**/*", ["styles"])
  gulp.watch("test/**/*", ["scripts", "test"])
  gulp.watch("src/scripts/**/*", ["scripts", "test"])
})

function reload() {
  livereload.reload()
}

/**
 * Build for distribution.
 */
gulp.task("build", function() {
  del.sync("build")

  // Assets
  gulp.src(["lib/**/*"])
    .pipe(gulp.dest(dist.root + "/lib"))
  gulp.src(["assets/**/*"])
    .pipe(gulp.dest(dist.root + "/assets"))

  // HTML
  gulp.src(src.html)
    .pipe(minifyHTML())
    .pipe(gulp.dest(dist.html))

  // Build styles
  gulp.src(src.styles)
    .pipe(less())
    .pipe(uglifycss())
    .pipe(gulp.dest(dist.styles))

  // Build scripts
  gulp.src(src.scripts)
    .pipe(browserify({
      debug: true,
      transform: ["babelify", "brfs"]
    }))
    .pipe(uglify())
    .pipe(gulp.dest(dist.scripts))
})
