'use strict';

angular.module('sh.imgUpload', ['tmp/image/upload.html', 'sh.focus'])
.directive('imgUpload', [function(){
	return{
		restrict: "E",
		replace: true,
		templateUrl: 'tmp/image/upload.html',
		scope:{
			imgSrc: '=',
			inputType: '@'
		},
		controller: ['$scope', '$element', '$attrs', 'uploadManager', '$rootScope', function($scope, $element, $attrs, uploadManager, $rootScope){
			// needed?
		    $scope.files = [];
		    $scope.percentage = 0;

		    $scope.upload = function () {
		        uploadManager.upload();
		        $scope.files = [];
		    };

		    $rootScope.$on('fileAdded', function (e, call) {
		        $scope.files.push(call);
		        $scope.$apply();
		    });

		    $rootScope.$on('uploadProgress', function (e, call) {
		        $scope.percentage = call;
		        $scope.$apply();
		    });
		}],
		link: function(scope, element, attrs){
			scope.view = {};
			scope.view.image = false;
			scope.view.placeholder = true;
			scope.input = {};
			scope.input.focus = "file";
		}
	}
}])
.factory('uploadManager', [ '$rootScope', function ($rootScope) {
    var _files = [];
    return {
        add: function (file) {
            _files.push(file);
            $rootScope.$broadcast('fileAdded', file.files[0].name);
        },
        clear: function () {
            _files = [];
        },
        files: function () {
            var fileNames = [];
            $.each(_files, function (index, file) {
                fileNames.push(file.files[0].name);
            });
            return fileNames;
        },
        upload: function () {
            $.each(_files, function (index, file) {
                file.submit();
            });
            this.clear();
        },
        setProgress: function (percentage) {
            $rootScope.$broadcast('uploadProgress', percentage);
        }
    };
}]);



angular.module("tmp/image/upload.html", []).run(["$templateCache", function($templateCache){
  $templateCache.put("tmp/image/upload.html",
    "<div class='image-upload'>"+
    "	<div ng-show=\"view.image\" class='uploaded-image'>"+
    "		<img ng-src=\"\" />"+
    "	</div>"+
    "	<div focus type=\"{{input.focus}}\" class='image-placeholder'>"+
    "		<input type='file' class='upload-input-action' />"+
    "	</div>"+
    "</div>"
    );
}]);


angular.module("sh.focus",['sh.imgUpload'])
.directive('focus', [ 'uploadManager', function(uploadManager){
	return {
		restrict: "A",
		scope:{
			type: '@'
		},
		link: function(scope, element, attrs){
			$(element).fileupload({
				dataType: 'text',
				url: 'http://localhost:8888/angular/img-upload/upload.php',
				add: function (e, data) {
					uploadManager.add(data);
					uploadManager.upload();
				},
				progressall: function (e, data) {
					var progress = parseInt(data.loaded / data.total * 100, 10);
					uploadManager.setProgress(progress);
				},
				done: function (e, data) {
					uploadManager.setProgress(0);
				}
			});

			scope.$watch('type', function(){
				if( scope.type !== undefined ){
					var input = element.find('input')[0];

					element.bind('click', function(){						
						switch( scope.type ){
							case 'file':
								input.click();
							default:
								input.focus();
						};
					});

					// upload the file immediately...needed?
					input.onchange = function(data){
						console.log( uploadManager.files());

					}
				}
			});
		}
	}
}]);
