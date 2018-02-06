var gulp = require('gulp')
var image = require('gulp-image')
var html = require('gulp-jade')
var css = require('gulp-sass')
var connect = require('gulp-connect')
var plumber = require('gulp-plumber')
var notify = require('gulp-notify')

	gulp.task('image-task', function(){ // image-task -- название нашего задания. // cmd:/ gulp image-task
		gulp.src(['./src/img/*.jpg', './src/img/*.png']) 
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(image()) 
		.pipe(gulp.dest('./dist/img'))
		.pipe(connect.reload())
	})

	gulp.task('html-task', function(){
		gulp.src('./src/**/!(_)*.jade')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(html())
		.pipe(gulp.dest('./dist/'))
		.pipe(connect.reload())
	})

	gulp.task('css-task', function(){
		gulp.src(['./src/**/*.scss', './src/**/*.sass'])
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(css())
		.pipe(gulp.dest('./dist/style'))
		.pipe(connect.reload())
	})

	gulp.task('watch', function(){
		gulp.watch(['src/img/*.jpg', 'src/img/*.png'], {cwd:'./'}, ['image-task'])
		gulp.watch('src/**/*.jade', {cwd:'./'}, ['html-task'])
		gulp.watch(['src/**/*.scss', 'src/**/*.sass'], {cwd:'./'}, ['css-task'])
	})

	gulp.task('connect', function(){
		connect.server({
			port: 9000,
			livereload: true,
			root: 'dist'
		})
	})

gulp.task('default', ['connect', 'watch', 'image-task', 'html-task', 'css-task'])