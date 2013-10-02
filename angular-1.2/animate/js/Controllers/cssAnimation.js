(function(){
	'use strict';
	poc.controller('cssAnimation', ['$scope', '$timeout', function($scope, $timeout){
		$scope.items = [];

		var addItem = function( data ){
			$timeout(function(){
				$scope.items.unshift( data );
				if( $scope.items.length === 6 ){
					$scope.items.pop();
				}
				addItem( Math.random() );
			}, 2000);
		};

		return addItem( Math.random() );

	}]);
})()