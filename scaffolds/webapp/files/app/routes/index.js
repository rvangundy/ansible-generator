'use strict';

module.exports = function route(server) {

    // Root /
    require('./index.html')(server, {
        src: './client/index.hbs',
        public: '/'
    });

    // scripts/main.js
    require('./scripts/main')(server, {
        src: './client/scripts/main.js',
        public: '/scripts/main.js'
    });

    // styles/main.css
    require('./styles/main.css')(server, {
        src: './client/styles/main.styl',
        public: '/styles/main.css'
    });

    if (process.env.NODE_ENV === 'development') {
        // modules/
        require('./modules/index.html')(server, {
            src: './client/modules/',
            public: '/modules/'
        });
    }
};
