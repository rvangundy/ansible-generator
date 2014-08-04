'use strict';

var template = require('template');
var script = require('script');
var data = require('data');

window.addEventListener('load', function () {
    var el = template(data);

    script(el, data);
    document.body.appendChild(el);
});
