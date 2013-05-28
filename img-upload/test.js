angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.pagination","ui.bootstrap.tabs"]);
angular.module("ui.bootstrap.tpls", ["template/pagination/pagination.html","template/tabs/pane.html","template/tabs/tabs.html"]);
angular.module('ui.bootstrap.pagination', [])

.constant('paginationConfig', {
  boundaryLinks: false,
  directionLinks: true,
  firstText: 'First',
  previousText: 'Previous',
  nextText: 'Next',
  lastText: 'Last'
})

.directive('pagination', ['paginationConfig', function(paginationConfig) {
  return {
    restrict: 'EA',
    scope: {
      numPages: '=',
      currentPage: '=',
      maxSize: '=',
      onSelectPage: '&',
      numEntries: '='
    },
    templateUrl: 'template/pagination/pagination.html',
    replace: true,
    link: function(scope, element, attrs) {

      // Setup configuration parameters
      var boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks;
      var directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$eval(attrs.directionLinks) : paginationConfig.directionLinks;
      var firstText = angular.isDefined(attrs.firstText) ? attrs.firstText : paginationConfig.firstText;
      var previousText = angular.isDefined(attrs.previousText) ? attrs.previousText : paginationConfig.previousText;
      var nextText = angular.isDefined(attrs.nextText) ? attrs.nextText : paginationConfig.nextText;
      var lastText = angular.isDefined(attrs.lastText) ? attrs.lastText : paginationConfig.lastText;

      // Create page object used in template
      function makePage(number, text, isActive, isDisabled) {
        return {
          number: number,
          text: text,
          active: isActive,
          disabled: isDisabled
        };
      }

      scope.$watch('numPages + currentPage + maxSize', function() {
        scope.pages = [];
        
        //set the default maxSize to numPages
        var maxSize = ( scope.maxSize && scope.maxSize < scope.numPages ) ? scope.maxSize : scope.numPages;
        var startPage = scope.currentPage - Math.floor(maxSize/2);
        
        //adjust the startPage within boundary
        if(startPage < 1) {
            startPage = 1;
        }
        if ((startPage + maxSize - 1) > scope.numPages) {
            startPage = scope.numPages - maxSize + 1;
        }

        // Add page number links
        for (var number = startPage, max = startPage + maxSize; number < max; number++) {
          var page = makePage(number, number, scope.isActive(number), false);
          scope.pages.push(page);
        }

        // Add previous & next links
        if (directionLinks) {
          var previousPage = makePage(scope.currentPage - 1, previousText, false, scope.noPrevious());
          scope.pages.unshift(previousPage);

          var nextPage = makePage(scope.currentPage + 1, nextText, false, scope.noNext());
          scope.pages.push(nextPage);
        }

        // Add first & last links
        if (boundaryLinks) {
          var firstPage = makePage(1, firstText, false, scope.noPrevious());
          scope.pages.unshift(firstPage);

          var lastPage = makePage(scope.numPages, lastText, false, scope.noNext());
          scope.pages.push(lastPage);
        }


        if ( scope.currentPage > scope.numPages ) {
          scope.selectPage(scope.numPages);
        }
      });
      scope.noPrevious = function() {
        return scope.currentPage === 1;
      };
      scope.noNext = function() {
        return scope.currentPage === scope.numPages;
      };
      scope.isActive = function(page) {
        return scope.currentPage === page;
      };

      scope.selectPage = function(page) {
        if ( ! scope.isActive(page) && page > 0 && page <= scope.numPages) {
          scope.currentPage = page;
          scope.onSelectPage({ page: page });
        }
      };
    }
  };
}]);
angular.module('ui.bootstrap.tabs', [])
.controller('TabsController', ['$scope', '$element', function($scope, $element) {
  var panes = $scope.panes = [];

  this.select = $scope.select = function selectPane(pane) {
    angular.forEach(panes, function(pane) {
      pane.selected = false;
    });
    pane.selected = true;
  };

  this.addPane = function addPane(pane) {
    if (!panes.length) {
      $scope.select(pane);
    }
    panes.push(pane);
  };

  $scope.searchUsers1 = function(){
        console.log('her3e');
      }

  this.removePane = function removePane(pane) { 
    var index = panes.indexOf(pane);
    panes.splice(index, 1);
    //Select a new pane if removed pane was selected 
    if (pane.selected && panes.length > 0) {
      $scope.select(panes[index < panes.length ? index : index-1]);
    }
  };
}])
.directive('tabs', function() {
  return {
    restrict: 'EA',
    transclude: true,
    scope: {},
    controller: 'TabsController',
    templateUrl: 'template/tabs/tabs.html',
    replace: true
  };
})
.directive('pane', ['$parse', function($parse) {
  return {
    require: '^tabs',
    restrict: 'EA',
    transclude: true,
    scope:{
      heading:'@',
      searchData:'='
    },
    controller:function($scope){
      $scope.searchUsers1 = function(){
        console.log('here');
      }
    },
    link: function(scope, element, attrs, tabsCtrl) {
      var getSelected, setSelected;
      scope.selected = false;
      if (attrs.active) {
        getSelected = $parse(attrs.active);
        setSelected = getSelected.assign;
        scope.$watch(
          function watchSelected() {return getSelected(scope.$parent);},
          function updateSelected(value) {scope.selected = value;}
        );
        scope.selected = getSelected ? getSelected(scope.$parent) : false;
      }
      scope.$watch('selected', function(selected) {
        if(selected) {
          tabsCtrl.select(scope);
        }
        if(setSelected) {
          setSelected(scope.$parent, selected);
        }
      });

      //scope.$watch('searchData', function(searchData) {
        //console.log('watch', searchData);
      //});


      tabsCtrl.addPane(scope);
      scope.$on('$destroy', function() {
        tabsCtrl.removePane(scope);
      });
    },
    templateUrl: 'template/tabs/pane.html',
    replace: true
  };
}]);

angular.module("template/pagination/pagination.html", []).run(["$templateCache", function($templateCache){
  $templateCache.put("template/pagination/pagination.html",
    "<div>" +
    "   <div class=\"list-user-pagination\"><ul>" +
    "     <li ng-repeat=\"page in pages\" ng-class=\"{active: page.active, disabled: page.disabled}\">"+
    "        <a ng-click=\"selectPage(page.number)\">{{page.text}}</a>" +
    "     </li>" +
    "     </ul>" +
    "   </div>" +
    "   <div class=\"list-user-information\">"+
    "     {{numEntries}} enteries - {{numPages}} pages" +
    "   </div>"+
    "</div>"+
    "");
}]);

angular.module("template/tabs/pane.html", []).run(["$templateCache", function($templateCache){
  $templateCache.put("template/tabs/pane.html",
    "<div class=\"tab-pane\" ng-class=\"{active: selected}\" ng-show=\"selected\" ng-transclude></div>" +
    "");
}]);

angular.module("template/tabs/tabs.html", []).run(["$templateCache", function($templateCache){
  $templateCache.put("template/tabs/tabs.html",
    "<div class=\"tabbable\">" +
    "  <ul class=\"nav nav-tabs clearfix\">" +
    "    <li ng-repeat=\"pane in panes\" ng-class=\"{active:pane.selected}\" >" +
    "      <a ng-click=\"select(pane)\">{{pane.heading}}</a>" +
    "      <div class=\"select-tab-controls\">" +
    "      <a ng-click=\"#/{{titleLink}}\">\<span class=\"icon ir {{icon}}\"></span>{{titleLinkText}}</a>"+
    "      <search-bar search-bar-data=\"pane.searchData\"></search-bar>" +
    "      </div>"+
    "    </li>" +
    "  </ul>" +
    "  <div class=\"tab-content\" ng-transclude></div>" +
    "</div>" +
    "");
}]);
