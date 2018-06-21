const gulp = require('gulp');
const srtToJson = require('gulp-srt-to-json');

gulp.task('str', function () {
    gulp.src('public/legendas/srt/*.srt')
        .pipe(srtToJson())
        .pipe(gulp.dest('public/legendas/json'));
});