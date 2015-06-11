/**
 *
 * Created by j on 6/11/2015.
 */

var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    connect = require('gulp-connect');


gulp.task('brows', function(){
    return browserify('./game.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'));

})

gulp.task('default',['brows']);
