;(function(){
	'use strict';
	
	angular.module('sim.userMessage', [ 'tmp/user/message.html', 'http-interceptor' ])
	.directive('userMessage', [function(){
		return{
			restrict: "E",
			replace: true,
			templateUrl: 'tmp/user/message.html',
			controller: ['$scope', '$element', '$attrs', '$rootScope', '$timeout', function($scope, $element, $attrs, $rootScope, $timeout ){
				$rootScope.$on('event:userMessage', function(broadCastData, msg){
					$element.addClass('error');
					$element.find('div.message')[0].innerHTML = msg;
					
					/*automatically close the message after 5 seconds*/
					$timeout(function(){
						$element.removeClass( 'error warning' );
					}, 5000);
				});
			}],
			link: function(scope, element, attrs){
				
				element.find('div.close-icon').bind('click', function(){
					element.removeClass('error warning');
					element.find('div.message')[0].innerHTML = "";
				});
				
			}
		};
	}]);
	
	
	
	angular.module( "tmp/user/message.html", []).run( [ "$templateCache", function( $templateCache ){
	  $templateCache.put( "tmp/user/message.html",
	    "<div class='mod-user-message'>" +
	    "	<div class='icon'></div>" +
	    "	<div class='message'></div>" +
	    "	<div class='close-icon' data-icon='&#xe068;'></div>" +
	    "</div>"
	    );
	}]);
})();
