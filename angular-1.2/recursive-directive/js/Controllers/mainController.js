;(function(){
	'use strict';
	angular.module( 'shaselton.directiveTest' ).
	controller( 'mainController', [ '$scope', function($scope){

		$scope.seaword = [
			{name:'Frank', children:[
				{name: 'Scott', children:[
					{name: 'Henry', children:[]}
				]}
			]},
			{name: 'Blake', children:[
				{name: 'Ryker', children:[]}
			]}
		];

		 $scope.treeFamily = {
	        name : "Parent",
	        children: [{
	            name : "Child1",
	            children: [{
	                name : "Grandchild1",
	                children: []
	            },{
	                name : "Grandchild2",
	                children: []
	            },{
	                name : "Grandchild3",
	                children: []
	            }]
	        }, {
	            name: "Child2",
	            children: []
	        }]
	    };

	}]);
})();