'use strict';

angular.module('creapp')
  .factory('mapBoundsService', function ($rootScope) {

    var usBounds = [[60.58696734225869,-69.16992187500001], [11.86735091145932, -124.71679687500001]];
    var listBounds = usBounds;

    var updateListBounds = function(bounds){
      listBounds = bounds;
      $rootScope.$broadcast('mapbounds:change');
      $rootScope.$digest();
    };

    var getListBounds = function(){
      return listBounds;
    };

    // ecnode bound to url parameters

    return {
      updateListBounds: updateListBounds,
      getListBounds: getListBounds
    };
  });
