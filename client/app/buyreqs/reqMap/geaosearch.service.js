'use strict';

angular.module('creapp3App')
  .factory('geosearchService', function ($rootScope, $http, $state) {

    var getLocation = function(query, callback, errorcallback){
      var url = 'https'+'://nominatim.openstreetmap.org/search?q='+query+'&limit=1&format=json&polygon_geojson=1&email=tech@creapp.us&json_callback=JSON_CALLBACK';
      $http.jsonp(url)
        .success(function(data){
          callback(data);
        })
        .error(function(error){
          console.log(error);
          errorcallback(error);
        });
    };


    return {
      getLocation: getLocation
    };
  });
