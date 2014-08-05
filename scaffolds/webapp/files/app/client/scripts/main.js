'use strict';

/******************
 *  Dependencies  *
 ******************/

var mainModule = require('../modules/main');

/**********
 *  Main  *
 **********/

window.addEventListener('load', function () {
    document.body.appendChild(mainModule());
});
