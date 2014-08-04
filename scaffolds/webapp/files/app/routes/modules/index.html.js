'use strict';

/******************
 *  Dependencies  *
 ******************/

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var stylus = require('gulp-stylus');
var nib = require('nib');
var handlebars = require('handlebars');
var fs = require('fs');

/*********
 *  Env  *
 *********/

var isDevelopment = process.env.NODE_ENV === 'development';

/***********
 *  Paths  *
 ***********/

var ROUTE = '/modules/';
var MODULES = './client/modules/';

/************
 *  Routes  *
 ************/

module.exports = function (server, routes) {
    var template;

    routes = routes || {
        src: MODULES,
        public: ROUTE
    };

    // /modules/:name/
    server.get(routes.public + ':name', function (req, res) {
        res.type('text/html');
        fs.readFile(__dirname + '/index.hbs', function (err, data) {
            template = handlebars.compile(data.toString());
            res.end(template({ name: req.params.name }));
        });
    });

    // /modules/:name/main.css
    server.get(routes.public + ':name/main.css', function (req, res) {
        res.type('text/css');
        gulp.src(routes.src + req.params.name + '/main.styl')
            .pipe(stylus({
                use: [nib()],
                import: 'nib',
                errors: true
            }))
            .once('data', function (file) {
                res.end(file.contents);
            });
    });

    // /modules/:name/index.js
    server.get(routes.public + ':name/index.js', function (req, res) {
        var name = req.params.name;
        var bfy = browserify({
            transform: ['dombarsify', 'envify'],
            debug: isDevelopment
        });

        // Set the environment variable so the browserified javascript includes
        // appropriate module code.
        process.env.MODULE_NAME = name;

        res.type('application/javascript');
        gulp.src(__dirname +  '/index.js')
            .pipe(bfy)
            .once('data', function (file) {
                res.end(file.contents);
            })
            .on('prebundle', function (bundler) {
                var base = '../../client/modules/' + name;

                bundler.require(base + '/template.hbs', { expose: 'template' });
                bundler.require(base + '/index.js', { expose: 'script' });
                bundler.require(base + '/defaults.json', { expose: 'data' });
            });
    });
};
