const express = require('express')
const app = express();
var cors = require('cors');

app.use(cors());

var getDataRouter = require('./routes/getData');

app.use('/', getDataRouter);

app.listen(9000, () => {
    console.log("server is running at 9000.");
});