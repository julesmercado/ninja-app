var appModule = angular.module('myApp', []);
var hostHeroIn = 'http://{{host}}:{{port}}/ninja/time/in';
var hostHeroOut = 'http://{{host}}:{{port}}/ninja/time/out';
var hostRegistration = 'http://{{host}}:{{port}}/ninja/add';
var productionLocation = '/static/lib/heromodel.json';


/*** Factory ***/

appModule.factory('loginFactory', function ($http) {
	return {
		getHeroModel : function () {
			return $http.get('lib/heromodel.json').then( function (result) {
				return result.data;
			});
		}
	}

});

/*appModule.factory('loginFactory', function ($http) {
	return {
		getHeroModel : function (callback) {
			return $http.get('lib/heromodel.json')
			.success(function (data) {
				callback(null, data);
			})
			.error(function ( error ) {
				callback(error);
			});
		}
	}

});*/

appModule.factory('timeInFactory' , function ($http) {
	return {
		timeInHero : function ( $heroTimeIn , callback) {
			return $http({
				url		: hostHeroIn,		
				method  : 'POST',
				data 	: $heroTimeIn
			})
			.success(function (data) {
				callback(null, data);
			})
			.error(function (errorMsg) {
				callback(errorMsg);
			});
		}
	}

});

appModule.factory('timeOutFactory' , function ($http) {
	return {
		timeOutHero : function ( $heroTimeOut , callback) {
			return $http({
				url		: hostHeroOut,		
				method  : 'POST',
				data 	: $heroTimeOut
			})
			.success(function (data) {
				callback(null, data);
			})
			.error(function (errorMsg) {
				callback(error);
			});
		}
	}

});

appModule.factory('registerHeroFactory', function ($http) {
	return {
		registerYourHero : function ( $heroRegisterInformation , callback) {
			return $http({
				url 	: hostRegistration,
				method 	: 'POST',
				data    : $heroRegisterInformation
			})
			.success(function (data) {
				callback(null, data);
			})
			.error(function (errorMsg) {
				callback(error);
			});
		}
	}
});


/*** Controller ***/

appModule.controller('loginController', function ($scope, loginFactory, timeInFactory, timeOutFactory) {

	var state = null;
	var dateAndTime = Date.now();

	loginFactory.getHeroModel().then(function (heroModelList) {
		
		for(var heroKey in heroModelList){
			if( "state" in heroModelList[heroKey] || heroModelList[heroKey] === "out"  ) {
				heroModelList[heroKey].state = "in";
				state = "in";
			} else {
				heroModelList[heroKey].state = "out";
				state = "out";
			}
		}

		$scope.heroModel = heroModelList;
	
	});


		$scope.timeIn = function ( heroInfo ) {
			
			$params = $.param({
				"id" 			: heroInfo.id,
				"name"  		: heroInfo.name,
				"position"  	: heroInfo.position,
				"dateAndTime" 	: dateAndTime,
				"state"			: heroInfo.state
			
			});

			timeInFactory.timeInHero($params,  function(error, Data) {
				if(error) {
					alert(error);
				} else {
					alert(data);
				}
			});
		}
	
		$scope.timeOut = function ( heroInfo ) {
		
			$params = $.param({
				"id" 			: heroInfo.id,
				"name"  		: heroInfo.name,
				"position"  	: heroInfo.position,
				"dateAndTime" 	: dateAndTime,
				"state"			: heroInfo.state
			
			});

			timeOutFactory.timeOutHero($params,  function(error, Data) {
				if(error) {
					alert(error);
				} else {
					alert(data);
				}
			});
		}
		

});


appModule.controller('registrationController', function ( $scope , registerHeroFactory ) {
	$scope.heroInfo = {};
	


	$scope.registerHero = function ( heroInfo ) {
		
		$params = $.param({
			"id" 		:  heroInfo.id,
			"name"		: heroInfo.name,
			"position"	: heroInfo.position
		});

		registerHeroFactory.registerYourHero($params, function(errorMsg, data) {
			if(errorMsg) {
				alert(errorMsg.error);
				
			} else {
				alert(data.status);
				
			}
		});
	}
});
