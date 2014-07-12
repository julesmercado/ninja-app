var formidable   = require("formidable");
	mongodb      = require("mongodb"),
 	queryString  = require("querystring"),
 	fs           = require("fs");




function indexs (response, postData) {
	fs.readFile("./static/index.html",function(error, file){
		if(error){
			response.writeHead(404, {"Content-type":"text/plain"});
			response.end("404 not found!");
		}

		else{

			response.writeHead(200, {"Content-type":"text/html"});
			response.end(file);
		}
	})

}

function ninja (response, postData) {

	response.writeHead(200,{"Content-type":"text/html"});
	response.end("<h1>Ninja Works!</h1>");

}

function ninjaAll (response, postData) {

	response.writeHead(200,{"Content-type":"text/html"});
	response.end("<h1>Ninja All Works!</h1>");

}

function ninjaTime (response, postData) {

	response.writeHead(200,{"Content-type":"text/html"});
	response.end("<h1>Ninja Time Works!</h1>");

}

function ninjaTimeIn (response, postData) {

	postData   = queryString.parse(postData);
	var name   = postData.name;
	var timeIn = queryString.parse(postData).time;
	 console.log(name);;
	response.writeHead(200,{"Content-type":"text/html"});
	response.end("<h1>Ninja Time In Works!</h1>");

}

function ninjaTimeOut (response, postData) {

	response.writeHead(200,{"Content-type":"text/html"});
	response.end("<h1>Ninja Time Out Works!</h1>");

}

function ninjaTimeAll (response, postData) {

	response.writeHead(200,{"Content-type":"text/html"});
	response.end("<h1>NinjaTimeAll Works!</h1>");

}

exports.indexs       = indexs;
exports.ninja        = ninja;
exports.ninjaAll     = ninjaAll;
exports.ninjaTime    = ninjaTime;
exports.ninjaTimeAll = ninjaTimeAll;
exports.ninjaTimeOut = ninjaTimeOut;
exports.ninjaTimeIn  = ninjaTimeIn;