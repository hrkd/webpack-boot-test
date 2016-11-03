var gulp        = require('gulp');
var swig        = require('gulp-swig');
var uglify      = require('gulp-uglify');
var webpack     = require('webpack-stream');
var browserSync = require('browser-sync').create();
var sassLint    = require('gulp-sass-lint');

var distPath    = './.dist/';
var buildPath   = './build/';

gulp.task('swig',function(){
  var outputPath,cssPath,jsPath;
  if(process.env.NODE_ENV === 'production'){
    outputPath = buildPath;
    jsPath = '/javascripts/bundle.min.js';
  }else{
    outputPath = distPath;
    jsPath = '/javascripts/bundle.js';
  }

  gulp.src([
    './source/html/**/*.html',
    '!./source/html/**/_*.html'
  ])
  .pipe(swig({
    defaults: { cache: false },
    data: {
      jsPath: jsPath,
    }
  }))
  .pipe(gulp.dest(outputPath));
});


gulp.task('js', function(){
  var outputPath = (process.env.NODE_ENV === 'production')?buildPath:distPath;
  var config = (process.env.NODE_ENV === 'production')?'./webpack.production.config.js':'./webpack.config.js';
  gulp.src('')
    .pipe(webpack(require(config)))
    .pipe(gulp.dest(outputPath+'javascripts'));
});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    port: 5200,
    server: ".dist",
    notify: false,
    files: [
      distPath+"**/*.html",
      distPath+"**/*.js",
      distPath+"**/*.css",
      distPath+"**/*.jpg",
      distPath+"**/*.png",
      distPath+"**/*.gif"
    ],
    ghostMode:false,
    open: false
  });
});

gulp.task('watch',function(){
  gulp.watch('./source/html/**/*.html', ['swig']);
  gulp.watch(['./source/javascripts/**/*.js','./source/javascripts/**/*.jsx'], ['js']);
});


gulp.task('lint', function() {
  return gulp.src(['source/**/*.s+(a|c)ss','!source/sass/icons/*.s+(a|c)ss'])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});


gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});


gulp.task('default',['set-dev-node-env','swig','js','watch','browser-sync']);
gulp.task('build',['set-prod-node-env','swig','js']);

