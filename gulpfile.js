var gulp = require('gulp');
var bower = require('gulp-bower');
var typescript = require('gulp-typescript');
var typescriptAngular = require('gulp-typescript-angular');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var p = require('./package.json');

gulp.task('bower', function() {
	return bower()
		.pipe(gulp.dest('public/lib/'))
});

gulp.task('clean', function () {
	return gulp.src('./public/tmp-scripts', {read: false})
		.pipe(clean());
});

gulp.task('compile', ['clean'], function () {
	return gulp.src(
		[
			'./app/**/*.ts'
		])
		.pipe(typescript({
			target:'es5'
		}))
		.pipe(typescriptAngular({
			decoratorModuleName:'app'
		}))
		.pipe(gulp.dest('./public/tmp-scripts'));
});

gulp.task('unify-scripts', ['compile'], function() {
	var bk = gulp.src('./public/tmp-scripts/**/*.js')
		.pipe(concat(p.name + '_' + p.version + '.js'))
		.pipe(gulp.dest('./public/dist'));
	gulp.start('clean');
	return bk;
});

gulp.task('sass', function () {
	gulp.src('./resources/styles/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(concat(p.name + '_' + p.version + '.css'))
		.pipe(gulp.dest('./public/dist'));
});

gulp.task('default', ['bower', 'unify-scripts', 'sass'], function() {
	gulp.watch('./app/**/*.ts', ['unify-scripts']);
	gulp.watch('./resources/styles/**/*.scss', ['sass']);
});

gulp.task('dev', ['unify-scripts', 'sass'], function() {
	gulp.watch('./app/**/*.ts', ['unify-scripts']);
	gulp.watch('./resources/styles/**/*.scss', ['sass']);
});