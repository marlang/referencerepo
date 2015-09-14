app.factory('AdService', ['$http', function($http) {
  return {
    list: function() {
      return $http.get('https://raw.githubusercontent.com/cscobootcamp/referencerepo/datafeeds/adfeed.json');
    }
  }
}]);