var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');

/* pathConfig*/
var browserDir = './dist',
    sassWatchPath = './src/css/**/*.scss',
    ejsWatchPath = './src/views/**/*.ejs',
    htmlWatchPath = './dist/**/*.html';
/**/

var ejs = require('gulp-ejs');

//Todo: render view to dist with extension .html
gulp.task('ejs', function(){
    return gulp.src('./src/views/components/**/*.ejs')
        .pipe(ejs({}, {}, {ext:'.html'}))
        .pipe(gulp.dest('dist/'))
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: browserDir
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('src/css/main.scss')
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
    gulp.watch(ejsWatchPath, ['ejs']);
    gulp.watch(sassWatchPath, ['sass']).on('change', browserSync.reload);
    gulp.watch(htmlWatchPath).on('change', browserSync.reload);
});

gulp.task('default', ['ejs', 'sass', 'watch', 'browser-sync']);