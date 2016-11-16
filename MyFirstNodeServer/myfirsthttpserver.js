require("babel-core").transform("code", {
  plugins: ["transform-react-jsx"]
});

var http = require('http');
var fs = require('fs');
var dispatcher = require('httpdispatcher');
var serverUrl = "127.0.0.1";
var counter = 0;


//Lets define a port we want to listen to
const PORT=8080; 

//We need a function which handles requests and send response
function handleRequest(request, response){
    //response.end('It Works!! Path Hit: ' + request.url);

    try {
    	//log the request on console
    	console.log(request.url);
    	//Dispatch
    	dispatcher.dispatch(request, response);
    } catch(err){
    	console.log(err);
	}
}

var server = http.createServer(function(req, res) {

  counter++;
  console.log("Request: " + req.url + " (" + counter + ")");
  
  if(req.url == "/sample.html") {

    fs.readFile("sample.html", function(err, text){
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
    return;

  }

  res.setHeader("Content-Type", "text/html");
  res.end("<p>Hello World. Request counter: " + counter + ".</p>");

});
console.log("Starting web server at " + serverUrl + ":" + PORT);
server.listen(PORT, serverUrl);
