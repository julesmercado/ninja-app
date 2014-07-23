var http            = require("http"),
    url             = require("url"),
    router          = require("./router"),
    express			= require("express"),
    requestHandlers = require("./requestHandlers"),
    server          = http.createServer(),
    os 				= require("os"),
    requestHolder 	= {},
    urlInfo			= {};

	
	requestHolder['/']      		     = requestHandlers.indexs;
	requestHolder['/static']             = requestHandlers.statics;
	requestHolder['/ninja'] 			 = requestHandlers.ninja;
	requestHolder['/ninja/all']          = requestHandlers.ninjaAll;
	requestHolder['/ninja/time/all']     = requestHandlers.ninjaTimeAll;
	requestHolder['/ninja/time/in']      = requestHandlers.ninjaTimeIn;
	requestHolder['/ninja/time/out']     = requestHandlers.ninjaTimeOut;
	requestHolder['/ninja/add'] 	     = requestHandlers.ninjaAdd;
	requestHolder['/ninja/add/view']	 = requestHandlers.ninjaAddView;
	requestHolder['/ninja/check']	     = requestHandlers.ninjaCheck;

var connections = os.networkInterfaces();
for(var counter = 0;counter < connections.wlan0.length;counter++ ){
	if(connections.wlan0[counter].family === 'IPv4'){

		urlInfo['address'] = connections.wlan0[counter].address;
		urlInfo['port']    = 8080;
		break;
	}
} 
server.on("request", function onRequest(request, response){
	var  urlData = url.parse(request.url,true);
	var  postData = '';

	request.setEncoding("utf8");
	
	request.on("data", function(postDataChunk){
		postData += postDataChunk;
		console.log(postData);
	});

	request.addListener("end", function(){
		router.route(urlData.pathname,requestHolder,response ,postData,urlInfo);
	});
});

server.on("listening", function onlistening(){
	console.log("listening");	
});
console.log(urlInfo['address']);
server.listen(urlInfo['port'],urlInfo['address']);

