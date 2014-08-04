'use strict';

/**
 * @api {get} /scripts/main.js Request webapp scripts
 */

/******************
 *  Dependencies  *
 ******************/

var gulp     = require('gulp');
var watchify = require('gulp-watchify');
var uglify   = require('gulp-uglify');
var dombarsify = require('dombarsify');
var envify = require('envify');
var aggregate = require('stream-aggregate');

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

    function updateContents(file) {
        jsSource = file.contents;
    }

    routes = routes || {
        src: MAIN_JS,
        public: ROUTE
    };

    watchify(function (watchify) {
        var stream = gulp.src(routes.src)
            .pipe(watchify({
                watch: true,
                setup: function (b) {
                    b.transform(dombarsify);
                    b.transform(envify);

                    if (!isDevelopment) {
                        b.transform(uglify);
                    }
                }
            }));

        aggregate(stream, function (err, data) {
            console.log(err);
            console.log(data);
        });

        return stream;
    })();

    /***********
     *  Route  *
     ***********/

    server.get(routes.public, function (req, res) {
        res.type('application/javascript');
        res.send(jsSource);
    });
};
