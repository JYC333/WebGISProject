var express = require('express');
var router = express.Router();

var pg = require('pg');

router.post('/', function (req, res) {
    var data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        data = JSON.parse(data);
        console.log(data);
        getData(data).then(
            function (Status) {
                res.send(Status);
            },
            function (Status) {
                res.send(Status);
            });
    });
});

function getData(girdid) {
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
        grid_id as gid,\
        count(distinct trajectory_id) as number_of_trajectories,\
        (\
            select polygon->'coordinates'->0\
            from\
            (\
                select ST_Envelope(the_geom)::json polygon\
            ) as polygon\
        ) as contour\
        from\
        (\
            with selected_trajectories as\
            (\
                select * from tbl_trajectory_edges where trajectory_id in\
                (\
                    select distinct trajectory_id from\
                    (\
                        select t.trajectory_id,t.edge_id,ng.grid_id from tbl_trajectory_edges t,tbl_network_grid_mapping ng\
                        where t.edge_id=ng.network_edge_id and ng.grid_id in ("+girdid+")"+
                    ") as unique_trajectories\
                )\
            )\
            select s.*,g.grid_id,gl.the_geom\
            from selected_trajectories s,tbl_network_grid_mapping g, grid_layer gl\
            where g.network_edge_id=s.edge_id and g.grid_id=gl.id\
        ) as selected_trajectory_grid_mapping_data\
        group by grid_id,the_geom\
    ),\
    features as (\
        select\
        array_to_json(array_agg(feature.*)) as sequence_of_grids\
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