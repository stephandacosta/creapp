'use strict';

angular.module('creapp')
  .factory('mapBoundsService', function () {

   var listBounds;

    var updateListBounds = function(bounds){
      listBounds = bounds;
    };

    var getListBounds = function(){
      return listBounds;
    }

    // ecnode bound to url parameters

    return {
      updateListBounds: updateListBounds,
      getListBounds: getListBounds
    };
  });
