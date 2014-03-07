'use strict';

/* Directives */

/*
angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
*/



app.directive('tsFadeIn', ['$timeout', function ($timeout) {
    return function (scope, elm, attrs) {
        scope.$watch(attrs.tsFadeIn, function (newVal, oldVal) {
            var delay = attrs.tsDelay || 0.5
            var time = attrs.tsTime || 1
            if (newVal) {
                $timeout(function () {
                    elm.defineTransition('none');
                    elm.css({opacity:0, visibility:'visible'})
                });
                $timeout(function () {
                    elm.trans({opacity:1, time:time, ease:CssEase.linear})
                }, delay * 1000);

            } else {
                elm.css({visibility:'hidden'})
            }
        });
    };
}]);


app.directive('animate', ['$value', '$defer', function(value, $defer) {
    return function(element) {
        $defer(function() {
            element.addClass(value);
        });
    }
}]);


app.directive('twocolbox', function() {
    return {
        restrict: 'E',
        link:  function( scope, element, attrs) {
            var htmlText = "HELLO";
            element.html('<div>' + htmlText +  '</div>');
        }
    }
});

/*
app.directive("spotlight:hover", function (expr) {
   return function (elm) {
       var scope = this;
       console.log(expr);
       elm.hover(function() {
          scope.$tryEval(expr);
       });
   }
});
*/