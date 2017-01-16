'use strict';

angular.module('creapp3App')
  .service('filterService',function(){
      this.search = {
        owner : 'Any',
        type : 'Any',
        mapfilter : false
      };
  });
