/*========================================================
Author:  developer2020 
e-mail:  dev276236@gmail.com
//=======================================================*/

//========================================================
//https://csstricks.com/gulpforbeginners/
//https://www.npmjs.com/package/gulp-jshint
//https://www.npmjs.com/package/gulp-csslint
//https://www.npmjs.com/package/gulp-html5-lint
//https://www.npmjs.com/package/gulp-jshint-file-reporter
//========================================================

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var htmlmin = require('gulp-htmlmin');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var html5Lint = require('gulp-html5-lint');
var csslint = require('gulp-csslint');
var gulpRemoveHtml = require('gulp-remove-html');
 

gulp.task('lint_css', function() {
  gulp.src('src/css/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter());
});

gulp.task('lint_html5', function() {
    return gulp.src('./src/*.html')
        .pipe(html5Lint());
});

gulp.task('lint_js_console', function() {
  return gulp.src('src/jasmine/spec/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('lint_js_log', function() {
  return gulp.src('src/jasmine/spec/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('gulp-jshint-file-reporter', {
      filename: __dirname + '/jshint-output.log'
    }));
});



//need to copy fonts 
gulp.task('fonts', function() {
return gulp.src('src/fonts/*.*')
.pipe(gulp.dest('dist/fonts'))
})

gulp.task('useref', function(){
return gulp.src('src/*.html')
.pipe(useref())
// Minifies only if it's a JavaScript file
.pipe(gulpIf('*.js', uglify()))
// Minifies only if it's a CSS file
.pipe(gulpIf('*.css', cssnano()))
.pipe(gulp.dest('dist'))
});

//do this on the dest file - it will be already copied and 
//updated once by useref
gulp.task('build-html', function () {
  return gulp.src('dist/index.html')
    .pipe(gulpRemoveHtml())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'));
});

//clean up dist if needed
gulp.task('clean:dist', function() {
return del.sync('dist');
})

gulp.task('build', function (callback) {
runSequence('clean:dist',
['useref', 'fonts'],'build-html',
callback
)
})