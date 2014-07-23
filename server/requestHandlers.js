var mongodb      = require("mongodb").MongoClient,
 	queryString  = require("querystring"),
 	fs           = require("fs"),
 	dataBaseUrl	 = "mongodb://localhost:8081/myDataBase",
 	mime		 = require("mime");


function statics(response, postData, pathname,urlInfo){
	pathname = pathname.replace( "/static", "" );
	fs.readFile("../client"+pathname,function(error, file){
		file = (""+file).replace(/{{host}}/gm,urlInfo['address']);
		file = (file).replace(/{{port}}/gm,urlInfo['port']);
		if(error){
			response.writeHead(404, {"Content-type":"text/html"});
			response.end("<h1>404 not found!</h1>");
		}

		else{
			console.log(file);
			response.writeHead(200, {"Content-type":mime.lookup(pathname)});
			response.write(postData);
			response.end(file);
		}
	});


}


function indexs (response, postData, pathname,urlInfo) {
	statics(response,postData,"/index.html",urlInfo);
}

function ninjaVeiwAdd (response, postData, pathname, urlInfo){
	statics(response,postData,"/registration.html",urlInfo);
}


function ninjaCheck(response, postData, pathname, urlInfo){

	//postData = JSON.parse(postData);
	mongodb.connect(dataBaseUrl, {w:1}, function(error, db){
		if(!error){
			db.collection('ninja', {w:1},function(error, collection){
				collection.findOne({id:30},function(error, items){
					if(items != null){
						response.writeHead(200, {"Content-type":"application/JSON"});
						response.end(JSON.stringify({
							status:'ok',
							data:'true'
						},null,"\t"));
					}
					else{
						response.writeHead(200, {"Content-type":"application/JSON"});
						response.end(JSON.stringify({
							status:'ok',
							data:'false'
						},null,"\t"));
					}	
				});
			});
		}
	});

}

function ninjaAdd(response, postData, pathname, urlInfo){
	postData = JSON.parse(postData);
	mongodb.connect(dataBaseUrl, function(error, db){
		if(!error){
			db.collection('ninja', function(error, collection){
				if(!error){
					collection.insert(postData,{w:1}, function(error, result){
						if(!error){
							response.writeHead(200,{"Content-type":"application/JSON"});
							response.end(JSON.stringify({
								status:'ok'
							},null,"\t"));
						}
						else{
							response.writeHead(404, {"Content-type":"application/JSON"});
							response.end(JSON.stringify({
							status:'error'
							},null,"\t"));	
						}
					});
				}
			});
		}
	});

}

function ninja (response, postData, pathname,urlInfo) {
	
	response.writeHead(200,{"Content-type":"application/JSON"});
	response.end(JSON.stringify({
		status:'ok',

	},null,"\t")); 


}

function ninjaAll (response, postData, pathname,urlInfo) {

	mongodb.connect(dataBaseUrl, {w:1}, function(error, db){
		if(!error){
			db.collection('ninja', {w:1},function(error, collection){
				collection.find().toArray(function(error, items){
					for(var counter = 0; counter < items.length; counter++){
						delete items[counter]._id;
					}
					if(!error){	
						response.writeHead(200, {"Content-type":"application/JSON"});
						response.end(JSON.stringify({
							status:'ok',
							data:items
						},null,"\t"));
					}
				});
			});
		}
	});
}

function ninjaTimeAll (response, postData, pathname,urlInfo) {
	mongodb.connect(dataBaseUrl, function(error, db){
		if(!error){
			db.collection('time', function(error, collection){
				if(!error){
					collection.find().toArray(function(error, items){
						for(var counter = 0; counter < items.length; counter++){
							delete items[counter]._id;
						}
						if(!error){
							response.writeHead(200, {"Content-type":"application/JSON"});
							response.end(JSON.stringify({
								status:'ok',
								data:items
							},null,"\t"));
						}
					});
				}
			});
		}
	});


}

function ninjaTimeIn (response, postData, pathname,urlInfo) {
	postData = JSON.parse(postData);
	mongodb.connect(dataBaseUrl, function(error, db){
		if(!error){
			db.collection('time', function(error, collection){
				if(!error){
					collection.insert(postData,{w:1}, function(error, result){
						if(!error){
							response.writeHead(200,{"Content-type":"application/JSON"});
							response.end(JSON.stringify({
								status:'ok',
								data:'successfully in'
							},null,"\t"));
						}
						else{
							response.writeHead(404, {"Content-type":"application/JSON"});
							response.end(JSON.stringify({
							status:'error'
							},null,"\t"));	
						}
					});
				}
			});
		}
	});
}

function ninjaTimeOut (response, postData ,pathname,urlInfo) {
	ninjaTimeIn (response, postData, pathname,urlInfo);
}



exports.indexs       = indexs;
exports.ninja        = ninja;
exports.ninjaAll     = ninjaAll;
exports.ninjaTimeAll = ninjaTimeAll;
exports.ninjaTimeOut = ninjaTimeOut;
exports.ninjaTimeIn  = ninjaTimeIn;
exports.statics      = statics;
exports.ninjaAdd 	 = ninjaAdd;
exports.ninjaVeiwAdd = ninjaVeiwAdd;
exports.ninjaCheck   = ninjaCheck;