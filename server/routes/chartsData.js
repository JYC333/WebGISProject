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
    var SQLcommand = "with feature as(\
        select \
        floor(extract(epoch from ts::timestamp with time zone)/(60*15)) tt,\
        count(1) cc,\
        to_char(to_timestamp(floor(extract(epoch from ts::timestamp with time zone)/(60*15))*60*15),'yyyy-MM-dd HH24:MI') date_text\
        from sample1000\
        group by tt\
        order by tt\
    ),\
    features as (\
        select\
        array_to_json(array_agg(feature.tt)) as \"tt\",\
        array_to_json(array_agg(feature.cc)) as \"cc\",\
        array_to_json(array_agg(feature.date_text)) as \"date_text\"\
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
                console.log(jsonData[0].row_to_json)
                resolve(jsonData[0].row_to_json);
            }
        })
    });

}

module.exports = router;