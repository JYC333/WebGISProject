const express = require('express');
var path = require('path');
var fs = require('fs');
const app = express();
var cors = require('cors');

app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));

var chartsDataRouter = require('./routes/chartsData');
var chartsData1Router = require('./routes/chartsData1');
var gridDataRouter = require('./routes/gridData');
var gridData1Router = require('./routes/gridData1');
var trajectoryDataRouter = require('./routes/trajectoryData');
var trajectoryData1Router = require('./routes/trajectoryData1');
var gridSequenceRouter = require('./routes/gridSequence');
var gridSequence1Router = require('./routes/gridSequence1');
var trajectorySequenceRouter = require('./routes/trajectorySequence');


app.use('/chartsData', chartsDataRouter);
app.use('/chartsData1', chartsData1Router);
app.use('/girdData', gridDataRouter);
app.use('/girdData1', gridData1Router);
app.use('/trajectoryData', trajectoryDataRouter);
app.use('/trajectoryData1', trajectoryData1Router);
app.use('/gridSequence', gridSequenceRouter);
app.use('/gridSequence1', gridSequence1Router);
app.use('/trajectorySequence', trajectorySequenceRouter);

app.get('/NetworkData', function (req, res) {
    var file = path.join(__dirname, 'public/NetworkData.json');
    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) {
            res.send('Load file failed.');
        } else {
            var jsonData = JSON.parse(JSON.stringify(data));
            res.send(jsonData);
        }
    });
});

app.listen(9000, () => {
    console.log("server is running at 9000.");
});