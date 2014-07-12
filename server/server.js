var http            = require("http"),
    url             = require("url"),
    router          = require("./router"),
    requestHandlers = require("./requestHandlers"),
    server          = http.createServer(),
    requestHolder 	= {};
	
	requestHolder['/']      		     = requestHandlers.indexs;
	requestHolder['/ninja'] 			 = requestHandlers.ninja;
	requestHolder['/ninja/all']          = requestHandlers.ninjaAll;
	requestHolder['/ninja/time']         = requestHandlers.ninjaTime;
	requestHolder['/ninja/time/all']     = requestHandlers.ninjaTimeAll;
	requestHolder['/ninja/time/in']      = requestHandlers.ninjaTimeIn;
	requestHolder['/ninja/time/out']     = requestHandlers.ninjaTimeOut;

 
server.on("request", function onRequest(request, response){
	var  urlData = url.parse(request.url,true);
	var  postData = "";

	request.setEncoding("utf8");
	
	request.on("data", function(postDataChunk){
		postData += postDataChunk;
		console.log(postData);
	});

	request.addListener("end", function(){
		router.route(urlData.pathname,requestHolder,response ,postData);
	});
});

server.on("listening", function onlistening(){
	console.log("listening");	
});

server.listen(8080,"192.168.1.42");

