'use strict';

/**
 * @api {get} /scripts/main.js Request webapp scripts
 */

/******************
 *  Dependencies  *
 ******************/

var gulp       = require('gulp');
var browserify = require('gulp-browserify');
var map        = require('map-stream');
var livereload = require('gulp-livereload');

/*********
 *  Env  *
 *********/

var isDevelopment = process.env.NODE_ENV === 'development';

/***********
 *  Paths  *
 ***********/

var ROUTE = '/scripts/main.js';
var MAIN_JS = './client/scripts/main.js';

/************
 *  Routes  *
 ************/

module.exports = function route(server, routes) {
    var jsSource;

    function buildSource() {
        var transforms = ['dombarsify', 'envify'];

        // Uglify if in production
        if (!isDevelopment) { transforms.push('uglifyify'); }

        gulp.src(routes.src).pipe(browserify({
            transform: transforms,
            debug: isDevelopment
        })).pipe(map(function (file, cb) {
            jsSource = file._contents.toString();
            cb(null, file);
        })).pipe(livereload());
    }

    routes = routes || {
        src: MAIN_JS,
        public: ROUTE
    };

    buildSource();
    gulp.watch(['./client/**/*.js', './client/**/*.hbs']).on('change', buildSource);

    /***********
     *  Route  *
     ***********/

    server.get(routes.public, function (req, res) {
        res.type('application/javascript');
        res.send(jsSource);
    });
};
