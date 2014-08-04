'use strict';

/******************
 *  Dependencies  *
 ******************/

var express = require('express');
var compression = require('compression');
var server = express();

/*************
 *  Globals  *
 *************/

var PORT = process.env.PORT || 80;

/****************
 *  Middleware  *
 ****************/

// Live reload
if (process.env.NODE_ENV === 'development') {
    var livereload = require('livereload');
    var connectLivereload = require('connect-livereload');
    livereload.createServer({
        exts: ['js', 'hbs', 'json', 'css', 'styl', 'html']
    }).watch('./client');

    server.use(connectLivereload());
}

// Gzip
server.use(compression({
    threshold: 512
}));

/************
 *  Routes  *
 ************/

require('./routes')(server);

/************
 *  Server  *
 ************/

server.listen(PORT);

console.log('Listening on port ' + PORT);
