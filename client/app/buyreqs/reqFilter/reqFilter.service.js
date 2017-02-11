'use strict';

angular.module('creapp')
  .service('filterService',function(){
      this.search = {
        owner : 'Any',
        type : 'Any',
        mapfilter : false
      };
  });
