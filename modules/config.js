"uses strict";

var nconf = require('nconf');

// Init configuration, load default values 
// e.g. 
// var conf = require('./modules/config');
// // Init config file
// conf.load({ 'http': { 'port': 8080 } });
nconf.load = function(defaults) {
    var fs = require("fs");
    // First consider commandline arguments and environment variables, respectively.
    nconf.argv().env();

    // Then load configuration from a designated file.
    var configfile = "config.json";
    if (!fs.existsSync(configfile)) {
        console.log("config file [", configfile, "] not found");
    } else {
        console.log("loading configuration from file [", configfile, "]");
    }
    nconf.file(configfile);

    // Provide default values for settings not provided above.
    nconf.defaults(defaults);
};


module.exports = nconf;