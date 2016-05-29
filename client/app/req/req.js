'use strict';

angular.module('creapp3App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('req', {
        url: '/req',
        template: '<ui-view layout="row"></ui-view>',
        controller: 'reqCtrl',
        sp: {
          authenticate: true
        }
      })
      .state('req.add', {
        url: '/add',
        templateUrl: 'app/req/req.html',
        controller: function($scope, $compile, appConstants){
          $scope.main.req = _.cloneDeep(appConstants.emptyReq);
        },
        sp: {
          authenticate: true
        }
      })
      .state('req.edit', {
        url: '/edit/{id}',
        resolve: {
          req: function($http,$stateParams){
            return $http.get('/api/buyreqs/'+ $stateParams.id).then(response => {
              return response.data;
            });
          }
        },
        templateUrl: 'app/req/req.html',
        controller: function($scope,req){
          $scope.main.req = req;
        },
        sp: {
          authenticate: true
        }
      });
  });
