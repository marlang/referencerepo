app.directive('userBlast', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      blast: '='
    },
    templateUrl: 'blast.html'
  };
});

app.directive('adBlast', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      ad: '='
    },
    templateUrl: 'ad.html'
  };
});

app.directive('scrollArrow', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scroll-arrow.html',
    compile: function(ele, attr) {
      if (attr.down != undefined) {
        $(ele).addClass('down-arrow');
      } else {
        $(ele).addClass('up-arrow');
      }
    }
  };
});

var randomizeArray = function(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

app.directive('blastList', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      blasts: '='
    },
    replace: true,
    templateUrl: 'blast-list.html',
    link: function(scope) {
      var displayLength = 3,
        autoscrollPeriod = 5000,
        currentIndex = displayLength - 1;
      scope.visibleBlasts = [];

      scope.scrollUp = function() {
        var newIndex = Math.max(currentIndex - 1, displayLength - 1);
        if (newIndex != currentIndex) {
          currentIndex = newIndex;
          scope.visibleBlasts.pop();
          scope.visibleBlasts.unshift(scope.blasts[currentIndex - (displayLength - 1)]);
        }
      };

      scope.scrollDown = function() {
        var newIndex = Math.min(currentIndex + 1, scope.blasts.length - 1 - displayLength);
        if (newIndex != currentIndex) {
          currentIndex = newIndex;
          scope.visibleBlasts.shift();
          scope.visibleBlasts.push(scope.blasts[currentIndex]);
        }
      }

      scope.reset = function() {
        scope.visibleBlasts = [];
        for (var i = 0; i < displayLength; i++) {
          scope.visibleBlasts.push(scope.blasts[i]);
        }
      };

      scope.autoscroll = function() {
        if (scope.blasts) {
          scope.scrollDown();
        }
        $timeout(scope.autoscroll, autoscrollPeriod);
      };


      scope.$watch('blasts', function(newValue, oldValue) {
        if (newValue) {
          scope.reset();
        }
      });

      scope.autoscroll();
    }
  };
}]);