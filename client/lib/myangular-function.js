var appModule = angular.module('myApp', []);
var host = 'http://192.168.1.42:8080/ninja/time/in';
var production_location = '/static/lib/heromodel.json';


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

appModule.factory('timeInFactory' , function ($http) {
	return {
		timeInHero : function ( $heroTimeIn , callback) {
			return $http({
				url		: host,		
				method  : 'POST',
				data 	: $heroTimeIn
			})
			.success(function (data) {
				callback(null, data);
			})
			.error(function (error) {
				callback(error);
			});
		}
	}

});

appModule.factory('registerHeroFactory', function ($http) {
	return {
		registerYourHero : function ( $heroRegisterInformation , callback) {
			return $http({
				url 	:  host,
				method 	: 'POST',
				data    : $heroRegisterInformation
			})
			.success(function (data) {
				callback(null, data);
			})
			.error(function (error) {
				callback(error);
			});
		}
	}
});


/*** Controller ***/

appModule.controller('loginController', function ($scope, loginFactory) {

	var state = null;

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
		var dateAndTime = Date.now();
		
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

});


appModule.controller('registrationController', function ( $scope , registerHeroFactory ) {
	$scope.heroInfo = {};
	
	$scope.registerHero = function ( heroInfo ) {
		
		$params = $.param({
			"id" 		:  heroInfo.id,
			"name"		: heroInfo.name,
			"position"	: heroInfo.position
		});

		registerHeroFactory.registerYourHero($params, function(error, data) {
			if(error) {
				alert(error);
			} else {
				alert(data);
			}
		});
	}
});
