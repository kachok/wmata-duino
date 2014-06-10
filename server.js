// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();
var http = require("http");

app.use(logfmt.requestLogger());

var api_key=process.env.API_KEY;

app.get('/', function(req, res) {
  res.send('Hello World!');
});

// Orange - EFC station
// http://www.wmata.com/rider_tools/pids/showpid.cfm?station_id=100

app.get('/orange/efc', function(req, res) {
	//http://api.wmata.com/StationPrediction.svc/json/GetPrediction/A10,A11?api_key=YOUR_API_KEY

 var url = "http://api.wmata.com/StationPrediction.svc/json/GetPrediction/K05?api_key="+api_key;

 http.get(url, function(res) {
      var arr = JSON.parse(res)
      res.send(arr);
    }).on('error', function(e) {
      res.send("Error: " + e.message);
 });

  //res.send('Vienna, BRD, 10, 20, New Carrollton, ARR, 5, 15');
});


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});