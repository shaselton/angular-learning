(function(){
	'use strict';
	poc.controller('mainController', function(){
		this.originalPosition = true;
		this.moveElement = function(){
			this.originalPosition = !this.originalPosition;
		}
	});

	poc.directive('moveElement', function( $animate ){
		return function( scope, element, attrs ){
			scope.$watch( attrs.moveElement, function( newValue ){
				if( newValue ){
					$animate.addClass( element, 'mover' );
				}else{
					$animate.removeClass( element, 'mover' );
				}
			});
		}
	});

	poc.animation('.mover', function(){
		return{
			addClass:function(element, className){
				TweenMax.to(element, 1, {left: '100px'});
			}, 
			removeClass:function(element, className){
				TweenMax.to(element, 1, {left: '0px'});
			}
		}
	})
})()