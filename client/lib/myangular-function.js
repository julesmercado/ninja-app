var appModule = angular.module('myApp', []);
var host = 'http://192.168.1.42:8080/ninja/time/in'

/*** Factory ***/

appModule.factory('loginFactory', function ($http) {
	return {
		getHeroModel : function () {
			return $http.get('/static/lib/heromodel.json').then( function (result) {
				return result.data;
			});
		}
	}

});

appModule.factory('timeInFactory' , function ($http) {
	return {
		timeInHero : function ( $heroTimeIn ) {
			return $http({
				url		: host,		
				method  : 'POST',
				data 	: $heroTimeIn
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

		timeInFactory.timeInHero($params);
	}

});

