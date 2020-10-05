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
            gl.gid as \"gid\",\
            gl.number_of_trajectories as \"trajectories\",\
            gl.number_of_trajectories_starting as \"trajectories_start\",\
            gl.number_of_trajectories_ending as \"trajectories_end\",\
            (\
                select polygon->'coordinates'->0\
                from\
                (\
                    select ST_Envelope(gl.the_geom)::json polygon\
                ) as polygon\
            ) as \"contour\"\
            from grid_layer as gl\
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
                resolve(jsonData[0].row_to_json);
            }
        })
    });

}

module.exports = router;