/*
	* npm中用到的命令
	npm install browser-sync gulp --save-dev

	npm install --save-dev gulp-iconfont

*/

var gulp = require('gulp');

// var jshint = require('gulp-jshint');
// var changed = require('gulp-changed');
// var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var iconfont = require('gulp-iconfont');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// var sass = require('gulp-sass');
// var less = require('gulp-less');


// var SRC = './js/*.js';
// var DEST = 'dist';

// gulp.task('sass', function(){
// 	gulp.src('pre-scss/*.scss')
// 	.pipe(sass())
// 	.pipe(gulp.dest('scss'))
// });
// gulp.task('less', function(){
// 	gulp.src('pre-less/*.less')
// 	.pipe(less())
// 	.pipe(gulp.dest('less'));
// });
gulp.task('iconfont', function(){
	gulp.src(['pre-assets/icons/*.svg'])
	.pipe(iconfont({
		fontName:'awesome_font',
		appendCodepoints:true
	}))
	.on('codepoints', function(codepoints, options){		
		console.log(codepoints, options);
	})
	.pipe(gulp.dest('assets/fonts/'))
})


gulp.task('concat', function(){
	return gulp.src('pre-js/*.js')
	.pipe(concat('all.js'))
	.pipe(gulp.dest('js'))
});


gulp.task('serve', ['minify-css'], function(){
	browserSync.init({
		server:"./"
	});
	gulp.watch("./pre-css/*.css", ['minify-css']);
	gulp.watch("./pre-css/*.css").on('change', reload); 

})

gulp.task('compress', function(){
	return gulp.src('pre-js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('js'));
});

gulp.task('compress-images', function(){
	return gulp.src('pre-images/*')
	.pipe(imagemin({progressive: true,optimizationLevel: 7}))
	.pipe(gulp.dest('images'));
});
gulp.task("minify-css", function(){
	return gulp.src('pre-css/*')
	.pipe(minifyCss({//keepSpecialComments:1 //所有css在一行显示
		keepBreaks: true  //css每条样式独占一行
	}))
	.pipe(gulp.dest('css'))
});

// gulp.task('changed', ['jshint'], function(){
// 	return gulp.src(SRC)
// 		.pipe(plumber())
// 		.pipe(changed(DEST))
// 		.pipe(gulp.dest(DEST));
// });
// gulp.task('jshint', function(){
// 	gulp.src('./js/main.js')
// 	    .pipe(plumber())
// 	    .pipe(changed(DEST))
// 	    .pipe(jshint.reporter('default'));
// });
gulp.task('watch', function(){
	gulp.watch(SRC, ['minify-css']);
});
gulp.task('default', ['serve']);