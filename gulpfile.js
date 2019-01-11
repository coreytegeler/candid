var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var browsersync = require('browser-sync').create();

function compilePug()  {
	return gulp.src('./index.pug')
		.pipe(plumber())
		.pipe(pug())
		.pipe(gulp.dest('./'))
	.on('end', function() {
		log('HTML done');
		if(argv.prod) log('HTML minified');
	});
}

function compileSass()  {
	var sassOptions = {
		compress: argv.prod ? true : false
	};
	var apOptions = {
		browsers: ['> 0.5%', 'last 5 versions', 'Firefox ESR', 'not dead']
	};
	return gulp.src('./sass/style.scss')
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass(sassOptions))
		.pipe(autoprefixer(apOptions))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./'))
	.on('end', function() {
		log('Sass done');
		if (argv.prod) log('CSS minified');
	});
}

function compileCoffee()  {
	return gulp.src('./coffee/*.coffee', { sourcemaps: true })
		.pipe(coffee({bare: true}))
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./'))
	.on('end', function() {
		log('Coffee done');
		if (argv.prod) log('JS minified');
	});
}

function browserSync(done) {
	browsersync.init({
		notify: false,
		server: {
			baseDir: './'
		}
	});
}

function browserSyncReload(done) {
	browsersync.reload();
}


function watchFiles() {
	gulp.watch('./*.pug', compilePug);
	gulp.watch('./sass/*.scss', compileSass);
	gulp.watch('./coffee/*.coffee', compileCoffee);
}

gulp.task('start', gulp.parallel(compilePug, compileSass, compileCoffee, watchFiles, browserSync));
gulp.task('watch', gulp.parallel(compileSass, compileCoffee, watchFiles));
gulp.task('build', gulp.parallel(compileSass, compileCoffee));

function log(message) {
	gutil.log(gutil.colors.bold.green(message));
}