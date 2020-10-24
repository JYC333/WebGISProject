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
        select\
            td.grid_id as \"gid\",\
            td.trajectories as \"trajectories\",\
            td.trajectories_start as \"trajectories_start\",\
            td.trajectories_end as \"trajectories_end\",\
            (\
                select polygon->'coordinates'\
                from\
                (\
                    select st_centroid(td.the_geom)::json polygon\
                ) as polygon\
            ) as \"contour\",\
            td.till as \"till\",\
            td.inside as \"inside\",\
            td.past as \"past\"\
            from tbl_distance1 as td\
        ),\
        features as (\
            select\
            array_to_json(array_agg(feature.*)) as \"features\"\
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
                console.log(jsonData);
                resolve(jsonData[0].row_to_json);
            }
        })
    });

}

module.exports = router;