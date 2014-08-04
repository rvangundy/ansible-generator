'use strict';

/**
 * @api {get} / Request root webapp
 */

/******************
 *  Dependencies  *
 ******************/

var handlebars = require('handlebars');
var fs = require('fs');

/***********
 *  PATHS  *
 ***********/

var ROUTE = '/';
var MAIN_HTML = './client/index.hbs';

/***********************
 *  Handlebars Helper  *
 ***********************/

handlebars.registerHelper('ifeq', function (a, b, options) {
    if (a === b) { return options.fn(this); }
});

/************
 *  Routes  *
 ************/

module.exports = function route(server, routes) {
    var template;
    var htmlSource;

    routes = routes || {
        src: MAIN_HTML,
        public: ROUTE
    };

    fs.readFile(routes.src, function (err, data) {
        template = handlebars.compile(data.toString());
        htmlSource = template(process.env);
    });

    server.get(routes.public, function (req, res) {
        res.type('text/html');
        res.send(htmlSource);
    });
};
