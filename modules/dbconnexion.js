var mysql = require('mysql');
var conf = require('./config');


var pool = mysql.createPool({
    host: conf.get("mysql:host"), //'192.168.1.20',
    user: conf.get("mysql:user"), //'sqladmin',
    password: conf.get("mysql:password"), //'12345',
    database: conf.get("mysql:database"), //'dev',
    debug: conf.get("mysql:debug") //false
});

module.exports = pool;



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