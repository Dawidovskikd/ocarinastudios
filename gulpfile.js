
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat');

//SASS tasks --------------------------------

gulp.task('compile-sass', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('.'));
});

gulp.task('watch-sass', function() {
    gulp.run('compile-sass');
    gulp.watch('./sass/**/*.scss', ['compile-sass']);
});

//!SASS tasks ----------------------------------