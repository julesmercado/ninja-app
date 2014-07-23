var appModule = angular.module('myApp', []);
var hostHeroIn = '/ninja/time/in';
var hostHeroOut = '/ninja/time/out';
var hostRegistration = '/ninja/add';
var heroGetInformation = '/ninja/time/all';


/*** Factory ***/

appModule.factory('loginFactory', function ($http) {
	return {
		getHeroModel : function () {
			return $http.get(heroGetInformation).then( function (result) {
				return result.data;
			});
		}
	}

});

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


	var dateAndTime = Date.now();

	loginFactory.getHeroModel().then(function (heroModelList) {
		
		for(var heroKey in heroModelList){
			if( "state" in heroModelList[heroKey] || heroModelList[heroKey] === "out"  ) {
				heroModelList[heroKey].state = "in";
				
			} else {
				heroModelList[heroKey].state = "out";
				
			}
		}

		$scope.heroModel = heroModelList;
	
	});


		$scope.timeIn = function ( heroInfo ) {
			
			$params = $.param({
				"id" 			: heroInfo.id,
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
	var dateAndTime = Date.now();	


	$scope.registerHero = function ( heroInfo ) {
		
		$params = $.param({
			"id" 			:  heroInfo.id,
			"name"			: heroInfo.name,
			"position"		: heroInfo.position,
			"registerOn"	: dateAndTime
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
