;(function(){
	'use strict';
	angular.module('shaselton.form').
	controller( 'mainController', [ '$scope', function( $scope ){

		$scope.testform = {};

		$scope.submitForm = function(){
			console.log($scope.testform);
		};

		$scope.testform.number = 1992;

	}]);
})();
