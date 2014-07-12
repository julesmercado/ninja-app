	

function route(pathname,requestholder,response,postData){
	console.log("about to process the request for"+pathname);
	if(typeof requestholder[pathname] === 'function'){
		requestholder[pathname](response, postData);
	}
	else{
		response.writeHead(404,{"Content-type": "text/html"});
		response.end("<h1>404 No result found!</h1>");
	}	
}


exports.route = route;