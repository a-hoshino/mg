// --------------------------------------------------------
// Plugin
// --------------------------------------------------------
var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var ejs = require( 'gulp-ejs' );
var imagemin = require( 'gulp-imagemin' );
var rename = require( 'gulp-rename' );
var runSequence = require( 'run-sequence' );
var babel = require('gulp-babel');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var autoprefixer = require('gulp-autoprefixer');
var jsonData = require('./src/ejs/setting.json');

// --------------------------------------------------------
// Directory
// --------------------------------------------------------
var path = {
    src: {
        ejs: './src/ejs/**/',
        sass: './src/sass/',
        img: './src/img/**/',
        js: './src/js/**/'
    },
    dest: {
        html: './docs/',
        css: './docs/css/',
        img: './docs/img/',
        js: './docs/js/'
    }
};

var pages = {
    top : './src/js/top.js'
};

jsonData.pages.forEach(function(value, index){
    pages[value] = './src/js/' + value + '.js';
});

// --------------------------------------------------------
// Task
// --------------------------------------------------------
gulp.task('ejs', function(){
    return gulp.src([path.src.ejs + '*.ejs', '!' + path.src.ejs + '_*.ejs'])
        .pipe(ejs({
            jsonData: jsonData
        }))
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest(path.dest.html));
});

gulp.task( 'sass', function(){
    return gulp.src( path.src.sass + '**/*.scss' )
    .pipe( sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4'],
        cascade: false
    }))
    .pipe( gulp.dest( path.dest.css ));
});

gulp.task('webpack', function(){
    return gulp.src(path.src.js + '**/*.js')
    .pipe( gulpWebpack({
        entry: pages,
        output: {
            path: __dirname + '/docs/js',
            filename: '[name].js',
            // export itself to a global var
            libraryTarget: 'var',
            // name of the global var: 'Foo'
            library: ['mg','[name]']
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        }
    }))
    .pipe(gulp.dest(path.dest.js));
});

gulp.task( 'imagemin', function(){
    var srcGlob = path.src.img + '/**/*.+(jpg|jpeg|png|gif|svg)';
    var dstGlob = path.dest.img;
    var imageminOptions = {
        optimizationLevel: 7,
        progressive: true,
    };

    gulp.src( srcGlob )
    .pipe( imagemin( imageminOptions ))
    .pipe( gulp.dest( dstGlob ));
});

gulp.task( 'watch', function(){
    gulp.watch( path.src.sass + '*.scss', ['sass']);
    gulp.watch( path.src.ejs + '*.ejs', ['ejs']);
    gulp.watch( path.src.ejs + '*.js', ['js']);
});

gulp.task( 'default', [ 'ejs', 'sass', 'webpack', 'imagemin', 'watch']);
