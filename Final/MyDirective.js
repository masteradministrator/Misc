angular.module('MyApp')
    .directive('ngX1', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngX1', function(x1) {
                elem.attr('x1', x1);
            });
        };
    })
    .directive('ngY1', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngY1', function(y1) {
                elem.attr('y1', y1);
            });
        };
    })
    .directive('ngX2', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngX2', function(x2) {
                elem.attr('x2', x2);
            });
        };
    })
    .directive('ngY2', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngY2', function(y2) {
                elem.attr('y2', y2);
            });
        };
    });