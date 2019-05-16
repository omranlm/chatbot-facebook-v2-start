

const pg = require('pg');
const config = require('../config');

function getOrgUnitChildern(orgUnit) {

    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        var rows = [];
        client.query(`SELECT id,name,parent_id FROM organization_unit WHERE parent_id='${orgUnit}'`,
            function (err, result) {
                if (err) {
                    console.log('Query error: ' + err);
                } else {
                    console.log('JSON.parse(result.rows) '+JSON.parse(result.rows));
                    return JSON.parse(result.rows);
                }
            });

    });
    pool.end();

}

module.exports.getOrgUnitChildern = getOrgUnitChildern;
