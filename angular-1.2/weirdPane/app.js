/**
 * shaselton
 * Looking to explore a pane-model directive that will allow the User to go n-deep with the UI.
 */

;(function(){
	'use strict';

	angular.module( 'shaselton.paneJazz', [ 'ngRoute', 'ngAnimate' ] )
	.config(['$routeProvider', function($routeProvider) {
	    $routeProvider.when('/', {templateUrl: 'partial.html', controller: 'mainController'})
	    .otherwise({redirectTo: '/'});
	}])
	.directive( 'sortable', [function(){
		return{
			restrict: 'A',
			scope:{},
			link: function( scope, element ){
				$(element).sortable({
					stop: function( event, ui ){
						console.log(ui.item.index());
					}
				});
			}
		};
	}])
	.controller( 'mainController', [ '$scope', function( $scope ){
		$scope.data = {};
		$scope.breadcrumbs = [];

		var baseLink = [{
			name: 'Scott',
			childNodes: [{
				name: 'Henry',
				childNodes:[]
			}],
		},
		{
			name: 'Dave',
			childNodes: [{
				name: 'Erin',
				childNodes:[{
					name: 'Henry',
					childNodes: []
				}]
			},
			{
				name: 'Katie',
				childNodes:[]
			}]
		},
		{
			name: 'Blake',
			childNodes: [{
				name: 'Ryker',
				childNodes: []
			}]
		}];

		var initialize = function( baseLink ){
			$scope.parentPane( baseLink );
			addCrumb( 'baseLink', baseLink );
		};

		var addCrumb = function( name, structure ){
			$scope.breadcrumbs.push( {'name': name, 'structure': structure} );
		};

		$scope.parentPane = function( parentList, childList ){
			$scope.data.parentPane = parentList;

			if( !!childList ){
				$scope.data.childPane = childList;
			}
		};

		$scope.jumpTo = function( structure, index ){
			$scope.data.parentPane = structure;
			// update the breadcrumbs
			$scope.breadcrumbs.splice( index + 1 );
		}

		$scope.nextLevel = function( name, childList, index ){
			console.log(index);
			$scope.data.parentPane = childList;
			addCrumb( name, childList );
		};

		$scope.save = function(){

			console.log(baseLink);

		}
		return initialize( baseLink );
	}])
})();