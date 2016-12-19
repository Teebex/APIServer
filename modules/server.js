// needed packages
var express = require('express');
var bodyparser = require('body-parser');
var morgan = require('morgan');

var logger = require('./logger');

// public required for error handling ?
var app = express();

// Starts server app 
// port : required, listening port
// routers : required, array of routers
function start(port, routers) {

    // configure app
    app.use(morgan('dev')); // log requests to the console

    // configure body parser
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));

    // Register routes
    for (var router in routers) {
        if (typeof(routers[router]) === "function") {
            logger.info("adding route to =" + router);
            app.use(router, routers[router]);
        }
    }

    // start the server
    app.listen(port);
    logger.info('starting sever, listening on port ' + port);
}

exports.start = start;