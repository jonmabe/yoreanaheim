'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var babel = require('gulp-babel');
const del = require('del');
const runSequence = require('run-sequence');
const path = require('path');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const config = require('config');

//gulp.task('dev', [ 'api' ]);

gulp.task('app', (callback) => {
        runSequence('build', [ 'webpack-dev-server', 'app-server' ], callback);
});

gulp.task('api', function() {
	nodemon({
		script:  'api/src/index.js',
		watch:   [ 'api/src', 'config' ],
		ignore:  [ '.git', 'node_modules/**/*' ],
		env:     { NODE_ENV: process.env.NODE_ENV || 'development' },
		delay:   1
	}).on('restart', function(e) {
		console.info('trigger:', e);
	});
});

/**
 * Asset Paths
 */
var paths = {
        js: ['app/src/assets/js/**/**/**/**/**/**/*.js'],
        less: ['app/src/assets/less/*.less'],
        css: ['app/src/assets/css/*.css'],
        img: ['app/src/assets/img/*.*'],
        html: ['app/src/assets/html/*.html'],
        nonassets: ['app/src/**/*.js'],
        favicon_src: ['app/src/favicon.ico'],
        favicon_dest: path.join('./app/public'),
        dist: function (p) {
                return path.join('./app/public/assets', p);
        }
};

gulp.task('build', (callback) => {
        runSequence('clean', 'move-public', 'webpack:build', callback);
});

gulp.task('clean', () => {
        return del([
                'app/public/**/**/*'
        ]);
});

gulp.task('move-public', () => {
        gulp.src(paths.favicon_src)
                .pipe(gulp.dest(paths.favicon_dest));
        gulp.src(paths.less)
                .pipe(gulp.dest(paths.dist('less')));
        gulp.src(paths.css)
                .pipe(gulp.dest(paths.dist('css')));
        gulp.src(paths.img)
                .pipe(gulp.dest(paths.dist('img')));
        return gulp.src(paths.html)
                .pipe(gulp.dest(paths.dist('html')));
});

gulp.task('webpack:build', () => {
        return gulp.src(paths.js)
                .pipe(gulpWebpack(webpackConfig, webpack, (err, stats) => {
                        /* Use stats to do more things if needed */
                        //console.log(err, stats);
                }))
                .pipe(gulp.dest(paths.dist('js')));
});

gulp.task('webpack-dev-server', (callback) => {
        // Start a webpack-dev-server
        
        var compiler = webpack(webpackConfig);
        var port = config.get('webpackDevServer.port');
        var hostname = config.get('webpackDevServer.hostname');  
        
        new webpackDevServer(compiler, {
                // server and middleware options
                publicPath: webpackConfig.output.publicPath,
                quiet: true,
                hot: true,
                historyApiFallback: true,
                headers: { 'Access-Control-Allow-Origin': '*' },
                compress: true
        }).listen(port, hostname, (err) => {
        	if(err) throw new gutil.PluginError('webpack-dev-server', err);
        	// Server listening
        });
});

/**
 * Run Server with Nodemon
 */
gulp.task('app-server', () => {
        nodemon({
                script: 'app/src/index.jsx',
                ignore: [
                        '.git',
                        'node_modules/**/*',
                        'public',
                        'webpack.config.*.js',
                        'gulpfile.js',
                        'src/assets/js/components/*',
                        'src/assets/js/containers/*',
                        'src/assets/js/reducers/*',
                ],
                env: {
                        NODE_ENV: process.env.NODE_ENV || 'development'
                }
        });
});

/**
 * Run Tests with Mocha and with Istanbul code coverage/reports
 */
gulp.task('test', (callback) => {
        mergeStream(
                gulp.src([ 'src/**/*.js' ]).pipe(istanbul({ includeUntested: true })),
                gulp.src([ 'test/**/*.js' ]).pipe(babel())
        ).pipe(istanbul.hookRequire())
                .on('finish', function () {
                        gulp.src([ 'test/*.js' ])
                                .pipe(mocha({ reporter: 'spec' }))
                                .pipe(istanbul.writeReports())
                                .pipe(istanbul.enforceThresholds({ thresholds: { global: 100 } }))
                                .on('end', callback)
                });
});