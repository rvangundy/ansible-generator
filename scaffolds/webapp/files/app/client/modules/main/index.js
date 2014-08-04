'use strict';

/******************
 *  Dependencies  *
 ******************/

var template = require('./template.hbs');
var defaults = require('./defaults.json');

/************
 *  Module  *
 ************/

module.exports = function main(element, data) {
    return template(defaults);
};
