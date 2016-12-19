var winston = require("winston");

// Logs levels : { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
var conf = require("./config");


const tsFormat = () => (new Date()).toLocaleTimeString();

// Configure console logs
var logger = new(winston.Logger)({
    transports: [new(winston.transports.Console)({
        timestamp: tsFormat,
        colorize: true,
        level: 'debug' //'info'
    })]
});


// check for log directory
logger.init = function() {
    var fs = require("fs");
    var logdir = conf.get("logs:directory");
    if ((typeof(logdir) !== "undefined") && (logdir != "")) {

        logger.info('log file added ', `${logdir}/logs.log`);
        if (!fs.existsSync(logdir)) {
            fs.mkdir(logdir);
        };

        logger.add(winston.transports.File, {
            filename: `${logdir}/logs.log`,
            timestamp: tsFormat,
            datePattern: 'yyyy-MM-dd',
            prepend: true,
            level: 'debug'
        });
    };
    return;
}


module.exports = logger;