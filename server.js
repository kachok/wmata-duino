// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();
var http = require("http");
var _ = require("underscore");

app.use(logfmt.requestLogger());

var api_key=process.env.API_KEY;

app.get('/', function(req, res) {
  res.send('Hello World!');
});

// Orange - EFC station
// http://www.wmata.com/rider_tools/pids/showpid.cfm?station_id=100

function reformat(data){
	var str="";

	console.log(data["Trains"]);

	var west, east;

	west = _.where(data["Trains"], {"Group":"2"});
	east = _.where(data["Trains"], {"Group":"1"});

	console.log(west);
	console.log(east);

	var west_times=[];
	var east_times=[];

	var i;

	for (i=0; i<west.length; i++){
		west_times.push(west[i]["Min"]);
	}
	for (i=0; i<east.length; i++){
		east_times.push(west[i]["Min"]);
	}

	west_times.sort();
	east_times.sort();

	str= "Vienna, "+ west_times.join(", ")+", New Carrollton, "+east_times.join(", ");

	return str;
}

app.get('/orange/efc', function(req, res) {
	//http://api.wmata.com/StationPrediction.svc/json/GetPrediction/A10,A11?api_key=YOUR_API_KEY

 var url = "http://api.wmata.com/StationPrediction.svc/json/GetPrediction/K05?api_key="+api_key;

 http.get(url, function(res2) {
	  var body = '';
	  res2.on('data', function(chunk) {
	    body += chunk;
	  });
	  res2.on('end', function() {
	    console.log(body);
	    body=JSON.parse(body);
      res.send(reformat(body));

	  });

    }).on('error', function(e) {
      res.send("Error: " + e.message);
 	});

  //res.send('Vienna, BRD, 10, 20, New Carrollton, ARR, 5, 15');
});

app.get('/env', function(req, res) {
      res.send(process.env.ENV_VAR);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});