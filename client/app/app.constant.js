(function(angular, undefined) {
'use strict';

  angular.module('creapp3App.constants', [])

  .constant('appConfig', {
    userRoles:['guest','user','admin'],
    creTypes:['Any','Leisure','Retail','Office','Industrial','Mulitfamily','Land']
  });

})(angular);