var http = require("http");
var path = require("path");
var url = require("url");
var fs = require("fs");

var contentType = function contentType( extension ){
	var content = "";
	switch( extension ){
		case ".html":
			content = "text/html";
			break;
		case ".css":
			content = "text/css";
			break;
		case ".js":
			content = "text/js";
			break;
		case ".json":
			content = "application/json";
			break;
		default: 
			content = "text/plain"
			break;
	}
	return {"Content-Type": content};
};

http.createServer(function ( request , response ){
	var requestPath = url.parse( request.url , true );
	if(requestPath.pathname == "/"){
		var html = fs.readFileSync(__dirname + "/index.html");
		response.writeHead(200, contentType(".html"));
		response.end(html);
	}else if(requestPath.pathname == "/register"){
		var html = fs.readFileSync(__dirname + "/registration.html");
		response.writeHead(200 , contentType(".html"));
		response.end(html);		
	}else if(requestPath.pathname == "/ninja/add"){
		var body = "";		
		request.on("data", function ( data ){
			body += data;
		});
		request.on("end", function (){
			console.log(body);
			response.end();
		});
	}else if( requestPath.pathname.match(/static\//i) ){			
		var realPath = requestPath.pathname.match(/static\/(.+)/i);
		// console.log(realPath);
		var pathFile = __dirname + "/" + realPath[1];
		var fileExtension = path.extname(pathFile);
		fs.readFile(pathFile, function ( err , content ) {
			if(err){
				response.writeHead(500);
			}else{
				response.writeHead(200 , contentType(fileExtension));
				response.write(content);
			}
			response.end();
		});
	}else if(requestPath.pathname == "/ninja/time/all"){
		var json = fs.readFileSync(__dirname + "/lib/heromodel.json");
		response.writeHead(200 , contentType(".json"));
		response.end(json);
	}
}).listen(8080);

console.log("Server Now Listening to Port 8080");