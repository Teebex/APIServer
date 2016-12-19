// Packages needed
var server = require("./modules/server");

// Init config file
var conf = require('./modules/config');
conf.load({ "http": { "port": 8080 } });

var logger = require('./modules/logger');
logger.init();

// routers
var basicrouter = require("./routes/basic");
var rollingshutter = require("./routes/rollingshutter");
var electricmeter = require("./routes/electricmeter");


var routers = [];
routers["/basic"] = basicrouter;
routers["/rollingshutter"] = rollingshutter;
routers["/electricmeter"] = electricmeter;

var port = conf.get('http:port');
server.start(port, routers);