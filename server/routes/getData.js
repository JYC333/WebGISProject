var express = require('express');
var router = express.Router();

var pg = require('pg');

router.get('/', function (req, res) {
    getData().then(
        function (Status) {
            res.send(Status);
        },
        function (Status) {
            res.send(Status);
        });
});

function getData() {
    var config = {
        host: 'localhost', // server name or IP address;
        port: 5432,
        database: 'WebGISProject',
        user: 'postgres',
        password: 'jindou970926'
    }

    const pool = new pg.Pool(config);

    var SQLcommand="with feature as(\
        select\
            n.id as id,\
            n.cpath as cpath,\
            n.ts as ts,\
            (\
                select lines->'coordinates'\
                from\
                (\
                    select ST_AsGeoJSON(n.mgeom)::json lines\
                ) as lines\
            ) as coordinates\
            from sample1000 as n\
        ),\
        features as (\
            select\
            array_to_json(array_agg(feature.*)) as features\
            from\
            feature\
        )\
        select row_to_json(features.*) from features";

    return new Promise(function (resolve, reject) {
        pool.query(SQLcommand, (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (res) {
                var jsonData = JSON.parse(JSON.stringify(res.rows));
                resolve(jsonData[0].row_to_json);
            }
        })
    });

}

module.exports = router;