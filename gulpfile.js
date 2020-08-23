// Init Gulp Variable
const gulp = require('gulp');

// Minify CSS
const cleanCSS = require('gulp-clean-css');
gulp.task('minify-css', () => {
    return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

// Minify JS
const minify = require('gulp-minify');
gulp.task('minify-js', () => {
    return gulp.src(['scripts/*.js'])
    .pipe(minify())
    .pipe(gulp.dest('dist/scripts'));
});

// Minify HTML (You can listen for .PHP files but only the HTML is minified)
var htmlmin = require('gulp-htmlmin');
gulp.task('minify-html', function() {
    return gulp.src('*.php')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

// Watch Tasks
gulp.watch('css/*.css', gulp.series(['minify-css']));
gulp.watch('scripts/*.js', gulp.series(['minify-js']));
gulp.watch('*.php', gulp.series(['minify-html']));

// Default Gulp Task
gulp.task('default', gulp.parallel('minify-css', 'minify-js', 'minify-html'));