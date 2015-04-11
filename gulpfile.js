var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var sourcemaps = require('gulp-sourcemaps');
var lr = require('tiny-lr')();
var browserify = require('browserify');  // Bundles JS.
var del = require('del');  // Deletes files.
var reactify = require('reactify');  // Transforms React JSX to JS.
var source = require('vinyl-source-stream');
var notify = require("gulp-notify");

/**
 * Task: `less`
 * Convert LESS files to CSS
 */
 gulp.task('less', function() {
  return gulp.src([
    './_assets/less/main.less'
    ])
  .pipe(sourcemaps.init())
  .pipe(less().on('error', handleError))
  .pipe(sourcemaps.write())
  .pipe(autoprefixer())
  .pipe(notify("Less Compiled!"))
  .pipe(gulp.dest('public/assets/css'));
});

/**
 * Task: `csso`
 * Minify stylesheets
 */
 gulp.task('csso', function() {
  return gulp.src([
    'public/assets/css/main.css'
    ])
  .pipe(csso())
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('public/assets/css'));
});

/**
 * Task: `revision`
 * Generate hash-appended copies of static asset files
 */
 gulp.task('revision', ['csso'], function() {
  return gulp.src([
    'public/assets/css/main.min.css'
    ], { base: __dirname })
  .pipe(rev())
  .pipe(gulp.dest('.'))
  .pipe(rev.manifest())
  .pipe(gulp.dest('public/assets'));
});

/**
 * Task: `livereload`
 * Start LiveReload server
 */
 gulp.task('livereload', function(next) {
  lr.listen(35729, function(err) {
    if (err) return console.error(err);
    next();
  });
});

/**
 * Task: `watch`
 * Watch LESS files for changes
 */
 gulp.task('watch', ['livereload'], function() {
  gulp.watch('./_assets/less/**/*.less', ['less']);
  gulp.watch([ './models/*.js','./client/**/*.js', '*.js', './server/**/*.js' ], ['js']);
  gulp.watch([
    'public/assets/css/main.css',
    'public/assets/js/*'
    ]).on('change', function(file) {
      livereload.changed(file, lr);
    });
  });

/**
 * Task: `clean`
 * Removes compiled files
 */
gulp.task('clean', function(done) {
  del(['build', 
    'public/assets/css/main.min.css'
    ], done);
});

/**
 * Task: `del-revision-min`
 * Removes compiled revision files
 */
gulp.task('del-revision-min', function() {
  del([
    'public/assets/css/main.min-*.css'
    ]);
});

/**
 * Task: `uglify`
 * Minify JavaScripts
 */
 gulp.task('uglify', function() {
  return gulp.src([
    'public/assets/js/bundle.js'
    ])
  .pipe(uglify())
  .pipe(rename('bundle.min.js'))
  .pipe(gulp.dest('public/assets/js'));
});

// Our JS task. It will Browserify our code and compile React JSX files.
gulp.task('js', ['clean'], function() {
  // Browserify/bundle the JS.
  browserify('./client/scripts/index.js')
    .transform(reactify).on('error', handleError)
    .bundle().on('error', handleError)
    .pipe(source('bundle.js').on('error', handleError))
    .pipe(notify("Scripts Compiled!"))
    .pipe(gulp.dest('./public/assets/js'));
});

/**
 * Task: `default`
 * Default task optimized for development
 */
 gulp.task('default', ['less', 'js', 'watch']);

/**
 * Task: `dev`
 * Alias for task `default`
 */
 gulp.task('dev', ['default']);

/**
 * Task: `release`
 * Runs optimization tasks
 */
 gulp.task('release', ['uglify', 'csso', 'del-revision-min', 'revision', 'clean']);

 function handleError(err) {
  notify.onError({title: "Gulp Error", message: err.message, sound: "Frog"})(err);
  console.log(err.toString());
  this.emit('end');
}