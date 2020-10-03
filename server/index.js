const express = require('express');
var path = require('path');
var fs = require('fs');
const app = express();
var cors = require('cors');

app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));

var getDataRouter = require('./routes/getData');
var gridDataRouter = require('./routes/gridData');
var gridSequenceRouter = require('./routes/gridSequence');
var trajectorySequenceRouter = require('./routes/trajectorySequence');


app.use('/', getDataRouter);
app.use('/girdData', gridDataRouter);
app.use('/gridSequence', gridSequenceRouter);
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