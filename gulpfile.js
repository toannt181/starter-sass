/**
 * Created by Dmytro on 3/27/2016.
 */
var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');

/* pathConfig*/
var browserDir = './dist',
    sassWatchPath = './src/css/**/*.scss',
    jsWatchPath = './src/**/*.js',
    htmlWatchPath = './dist/**/*.html';
/**/

gulp.task('js', function () {

});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: browserDir
        }
    });
});

gulp.task('sass', function () {
    return gulp.src(sassWatchPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
    gulp.watch(jsWatchPath, ['js']);
    gulp.watch(sassWatchPath, ['sass']).on('change', browserSync.reload);
    gulp.watch(htmlWatchPath).on('change', browserSync.reload);
});

gulp.task('default', ['js', 'sass', 'watch', 'browser-sync']);