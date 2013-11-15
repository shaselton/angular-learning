;(function(){
	'use strict';

	angular.module( 'shaselton.routeTest', [ 'ngRoute' ] )
	.config(['$routeProvider', function($routeProvider) {
	    $routeProvider.when('/view1', {
	    	templateUrl: 'partial1.html', 
	    	controller: 'mainController1', 
	    	resolve: { 
	    		app: function($q, $timeout, genericService) {
				        var results = genericService.getResults(),
				        	pResults = $q.defer();

				        if( !results.length ){
				        	// network call
				        	$timeout(function(){
					        	pResults.resolve(results);
					        	genericService.toggleResults();
					        }, 2000);
					        return pResults.promise;
				        }else{
				        	return results;
				        }
				        
				    }
	    	}
	    });
	    $routeProvider.when('/view2', {templateUrl: 'partial2.html', controller: 'mainController2'});
	    $routeProvider.otherwise({redirectTo: '/view1'});
	}])
	.factory( 'genericService', [function(){
		var results = [];
		return{
			getResults:function(){
				return results;
			},
			toggleResults:function(){
				results = [1,2,3,4];
			}
		}
	}])
	.controller( 'mainController1', [ '$scope', function( $scope ){
		var serviceResult;

		var initialize = function( whoami ){
			$scope.whoami = whoami;
		}

		$scope.$on( '$routeChangeSuccess', function(angularEvent, current, previous) {
			initialize(current.locals.app);
		})

	}])
	.controller( 'mainController2', [ '$scope', function( $scope ){
	}]);
})();