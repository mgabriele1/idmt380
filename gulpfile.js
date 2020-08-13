const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', () => {
    return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

const minify = require('gulp-minify');

gulp.task('minify-js', () => {
    return gulp.src(['scripts/*.js'])
    .pipe(minify())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.watch('css/*.css', gulp.series(['minify-css']));
gulp.watch('scripts/*.js', gulp.series(['minify-js']));

gulp.task('default', gulp.parallel('minify-css', 'minify-js'));