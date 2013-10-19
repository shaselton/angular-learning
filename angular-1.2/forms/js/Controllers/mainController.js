;(function(){
	'use strict';
	angular.module('shaselton.form').
	controller( 'mainController', [ '$scope', function( $scope ){

		$scope.submitForm = function(){
			console.log($scope.testform);
		}

	}]);
})();
