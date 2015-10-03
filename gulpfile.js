var gulp = require('gulp');
var bower = require('gulp-bower');
var typescript = require('gulp-typescript');
var watch = require('gulp-watch');
var typescriptAngular = require('gulp-typescript-angular');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var p = require('./package.json');

gulp.task('bower', function() {
	return bower()
		.pipe(gulp.dest('public/lib/'))
});

gulp.task('clean', function () {
	return gulp.src('./public/tmp', {read: false})
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
		.pipe(gulp.dest('./public/tmp'));
});

gulp.task('unify', ['compile'], function() {
	return gulp.src('./public/tmp/**/*.js')
		.pipe(concat(p.name + '_' + p.version + '.js'))
		.pipe(gulp.dest('./public/dist'));
});

gulp.task('default', ['bower', 'compile', 'unify'], function() {
	watch('./app/**/*.ts', function () {
		gulp.start('compile');
		gulp.start('unify');
	});
});