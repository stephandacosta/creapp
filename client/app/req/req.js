'use strict';

angular.module('creapp3App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('req', {
        url: '/req',
        template: '<ui-view flex layout="row" layout-fill></ui-view>',
        controller: 'reqCtrl',
        sp: {
          authenticate: true
        }
      })
      .state('req.add', {
        url: '/add',
        templateUrl: 'app/req/req.html',
        controller: function($scope, $compile, $mdMedia, ppConstants){
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
        controller: function($scope, $mdMedia, req){
          $scope.main.req = req;
        },
        sp: {
          authenticate: true
        }
      });
  });
