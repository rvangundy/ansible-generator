'use strict';

/**
 * @api {get} /styles/main.css Request webapp stylesheet
 */

/******************
 *  Dependencies  *
 ******************/

var gulp      = require('gulp');
var watch     = require('gulp-watch');
var stylus    = require('gulp-stylus');
var nib       = require('nib');
var normalize = require('normalize');
var minifyCSS = require('gulp-minify-css');

/*********
 *  Env  *
 *********/

var isDevelopment = process.env.NODE_ENV === 'development';

/***********
 *  Paths  *
 ***********/

var ROUTE = '/styles/main.css';
var MAIN_STYL = './client/styles/main.styl';

/************
 *  Routes  *
 ************/

module.exports = function route(server, routes) {
    var styleSource;

    routes = routes || {
        src: MAIN_STYL,
        public: ROUTE
    };

    // Development build
    if (isDevelopment) {
        gulp.src(routes.src)
            .pipe(watch(function (files) {
                return files.pipe(stylus({
                    use: [nib(), normalize()],
                    import: ['nib', 'normalize'],
                    errors: true
                }))
                .once('data', function (file) {
                    styleSource = file.contents;
                });
            }));
    }

    // Production build
    else {
        gulp.src(routes.src)
            .pipe(watch(function (files) {
                return files.pipe(stylus({
                    use: [nib(), normalize()],
                    import: ['nib', 'normalize'],
                    errors: true
                }))
                .pipe(minifyCSS())
                .once('data', function (file) {
                    styleSource = file.contents;
                });
            }));
    }

    // Route
    server.get(routes.public, function (req, res) {
        res.type('text/css');
        res.send(styleSource);
    });
};
