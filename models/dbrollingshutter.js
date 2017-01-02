var pool = require('../modules/dbconnexion');
var logger = require("../modules/logger");

exports.rollingshutter = {
    // create a record of position for a shutter
    create: function(DBError, ID, position, timestamp) {
        logger.debug('DBAdding ID:', ID, " position:", position, " timestamp:", timestamp);
        pool.query('INSERT INTO rollershutter SET ID=?, position=?, timestamp=?', [ID, position, timestamp], function(err) {
            if (err) {
                logger.error("Insert statement error:", err.code, ' stack:', err);
                DBError(true);
            } else {
                logger.debug('record inserted');
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
                sql = 'SELECT ID, position, timestamp from rollershutter order by timestamp,ID';
            } else {
                sql = 'SELECT ID, position, timestamp from rollershutter where ID=' + cnx.escape(ID) + ' order by timestamp';
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