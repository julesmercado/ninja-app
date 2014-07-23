	

function route(pathname,requestholder,response,postData,urlInfo){

	console.log("about to process the request for"+pathname);
	
	if((/^\/static/).test(pathname)){
		requestholder['/static'](response, postData,pathname,urlInfo);
	}
	else if(typeof requestholder[pathname] === 'function'){
		requestholder[pathname](response, postData, pathname,urlInfo);
	}
	else{
		response.writeHead(404,{"Content-type": "text/html"});
		response.end("<h1>404 No result found!</h1>");
	}	
}


exports.route = route;