var mysql = require('mysql');
var conf = require('./config');

// var logger = require("../modules/logger");

// Target 
//var pool = mysql.createPool(config.db);


var pool = mysql.createPool({
    host: conf.get("mysql:host"), //'192.168.1.20',
    user: conf.get("mysql:user"), //'sqladmin',
    password: conf.get("mysql:password"), //'12345',
    database: conf.get("mysql:database"), //'dev',
    debug: conf.get("mysql:debug") //false
});

module.exports = pool;

// usage
/*

var DBcnx = require('./modules/');

var test = function(req, res) {
     DBcnx.getConnection(function(cnx){
         cnx.query("select * from tagada", function(err, rows) {
             if (err) throw err;
             res.json(rows);
             cnx.release();
         }
     })
}


var getConnection = function(callback) {
    logger.debug('Before pool.getconnection');
    pool.getConnection(function(err, connection) {
        // Error management is centralized here
        if (err) {
            logger.error('Error getting dbconnexion :', err);
        }; //else 
        //{
        // Callback to do the actual job and release cnx
        logger.debug('dbconnexion gotten, before callback');
        callback(connection);
        //}
    });
};

exports.getConnection = getConnection;
*/

// Other expression

exports.connection = {
    // query sous la forme de texte + arguments 
    query: function() {
        var queryArgs = Array.prototype.slice.call(arguments),
            events = [],
            eventNameIndex = {};

        pool.getConnection(function(err, cnx) {
            if (err) {
                if (eventNameIndex.error) {
                    eventNameIndex.error();
                }
            }
            if (cnx) {
                var q = cnx.query.apply(cnx, queryArgs);
                // Closes cnx on end of dataset
                q.on('end', function() {
                    cnx.release();
                });

                events.forEach(function(args) {
                    q.on.apply(q, args);
                });
            }
        });

        return {
            on: function(eventName, callback) {
                events.push(Array.prototype.slice.call(arguments));
                eventNameIndex[eventName] = callback;
                return this;
            }
        };
    },

};


// Usage
//var db = require('DBConnexion');

//db.connection.query("SELECT * FROM `table` WHERE `id` = ? ", row_id)
//          .on('result', function (row) {
//            setData(row);
//          })
//          .on('error', function (err) {
//            callback({error: true, err: err});
//          });