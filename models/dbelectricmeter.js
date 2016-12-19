var pool = require('../modules/dbconnexion');
var logger = require("../modules/logger");

exports.electricmeter = {
    // create a record of cumulativevalue for specified electricmeter
    /**
     * @param  {} DBError
     * @param  {} ID
     * @param  {} cumulativevalue
     * @param  {} timestamp
     */
    create: function(DBError, ID, cumulativevalue, timestamp) {
        logger.debug('DBAdding electricmeter ID:', ID, " cumulativevalue:", cumulativevalue, " timestamp:", timestamp);
        var tshours = timestamp.getHours();
        var tsminutes = timestamp.getMinutes();
        var tsdate = new Date(timestamp.getFullYear(), timestamp.getMonth(), timestamp.getDate());

        pool.query('insert INTO electricmeter SET ID = ? , cumulativevalue = ? ,timestamp = ? , tsdate = ? , tshour = ? , tsminute = ?', [ID, cumulativevalue, timestamp, tsdate, tshours, tsminutes], function(err, rows) {
            if (err) {
                logger.error("Insert statement error:", err.code, ' stack:', err);
                DBError(true);
            } else {
                //logger.debug('record inserted');
                DBError(false);
            }
        });
    },

    // retrieve position for one or all shutters, ID is optional shutterID
    fetchAll: function(callback, ID) {
        pool.getConnection(function(err, cnx) {
            if (err) {
                logger.error(err.stack);
                callback(err, null);
                return;
            }

            var sql;
            if (typeof(ID) === 'undefined') {
                sql = 'SELECT ID, cumulativevalue, timestamp from electricmeter order by timestamp,ID';
            } else {
                sql = 'SELECT ID, cumulativevalue, timestamp from electricmeter where ID=' + cnx.escape(ID) + ' order by timestamp';
            }
            logger.debug(sql);

            cnx.query(sql, function(err, result) {
                if (err) {
                    logger.error(err.stack);
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });

            cnx.release();
        })

    }

}