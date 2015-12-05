var gulp = require('gulp');
var typescript = require('gulp-typescript');
var typescriptAngular = require('gulp-typescript-angular');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var Server = require('karma').Server;
var clean = require('gulp-clean');
var p = require('./package.json');
var templateCache = require('gulp-angular-templatecache');

gulp.task('templates', function () {
	return gulp.src('app/modules/**/*.html')
		.pipe(templateCache({
			module: 'app'
		}))
		.pipe(gulp.dest('public/tmp-scripts'));
});

gulp.task('concat-bower', function() {
	return gulp.src('bower_components/**/*.js')
		.pipe(concat('vendors.js'))
		.pipe(gulp.dest('./public/dist/'));
});

gulp.task('clean', function () {
	return gulp.src('./public/tmp-scripts', {read: false})
		.pipe(clean());
});

gulp.task('compile', ['templates'], function () {
	return gulp.src(
		[
			'./app/**/*.ts'
		])
		.pipe(typescript({
			target:'es5',
			experimentalDecorators: 'true'
		}))
		.pipe(typescriptAngular({
			decoratorModuleName:'app'
		}))
		.pipe(gulp.dest('./public/tmp-scripts'));
});

gulp.task('unify-scripts', ['compile'], function() {
	var bk = gulp.src('./public/tmp-scripts/**/*.js')
		.pipe(concat(p.name + '_' + p.version + '.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/dist'));
	return bk;
});

gulp.task('sass', function () {
	gulp.src('./resources/styles/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(concat(p.name + '_' + p.version + '.css'))
		.pipe(gulp.dest('./public/dist'));
});

gulp.task('copy-icons', function () {
	gulp.src('./bower_components/foundation-icon-fonts/foundation-icons.ttf')
		.pipe(gulp.dest('./public/dist'));
});


gulp.task('default', ['concat-bower', 'unify-scripts', 'sass', 'copy-icons', 'templates'], function() {
	gulp.start('clean');
});

gulp.task('test', ['dev'], function (done) {
	new Server({
		configFile: __dirname + '/tests/karma.conf.js',
		singleRun: true
	}, done).start();
});

gulp.task('dev', ['concat-bower', 'unify-scripts', 'sass', 'copy-icons', 'templates'], function() {
	gulp.start('clean');
	gulp.watch('./app/**/*.ts', ['unify-scripts']);
	gulp.watch('./app/modules/**/*.html', ['compile', 'unify-scripts']);
	gulp.watch('./resources/styles/**/*.scss', ['sass']);
	gulp.watch('./app/modules/**/*.scss', ['sass']);
});