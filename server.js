// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());



app.get('/', function(req, res) {
  res.send('Hello World!');
});

// Orange - EFC station
// http://www.wmata.com/rider_tools/pids/showpid.cfm?station_id=100

app.get('/orange/efc', function(req, res) {
  res.send('Vienna, BRD, 10, 20, New Carrollton, ARR, 5, 15');
});


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});