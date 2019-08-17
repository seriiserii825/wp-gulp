'use strict';

let gulp = require('gulp'),
	//css
	sass = require('gulp-sass'),
	autoprefixer = require("gulp-autoprefixer"),
	sourcemaps = require('gulp-sourcemaps'),
	wait = require('gulp-wait'),
	notify = require("gulp-notify"),
	plumber = require("gulp-plumber"),
	rimraf = require("rimraf");

gulp.task("css", function () {
	return gulp.src('scss/my.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(wait(500))
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', notify.onError(function (error) {
			return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error;
		})))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('css/'));
});

gulp.task("clean", function (cb) {
	return rimraf('css/', cb);
});

gulp.task("watch", function () {
	gulp.watch('scss/**/*.*', gulp.series('css'));
});

gulp.task('default', gulp.series(
	'clean',
	gulp.parallel(
		'css',
	),
	gulp.parallel('watch')
));
