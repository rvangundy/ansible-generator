'use strict';

/******************
 *  Dependencies  *
 ******************/

var mainModule = require('../modules/main');
var labelModule = require('../modules/label');

/**********
 *  Main  *
 **********/

window.addEventListener('load', function () {
    document.body.appendChild(mainModule());
    document.body.appendChild(labelModule());
});
