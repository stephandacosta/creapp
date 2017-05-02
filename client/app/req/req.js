'use strict';

angular.module('creapp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('req', {
        url: '/req',
        abstract: true,
        template: '<div flex layout="row" ui-view></div>',
        sp: {
          authenticate: true
        }
      })
      .state('req.add', {
        url: '/add',
        abstract: true,
        controller: 'reqCtrl',
        resolve: {
          req: function(appConstants){
            return _.cloneDeep(appConstants.emptyReq);
          }
        },
        templateProvider: function($mdMedia){
          if ($mdMedia('xs')){
            return '<div flex ng-include="\'app/req/reqMobile.html\'" layout="row"></div>';
          } else {
            return '<div flex ng-include="\'app/req/reqDesktop.html\'" layout="row"></div>';
          }
        }
      })
      .state('req.add.views', {
        url: '',
        views: {
          'form': { templateUrl: 'app/req/reqForm/reqForm.html' },
          'map': { templateUrl: 'app/req/reqForm/reqFormMap.html' }
        }
      })
      .state('req.edit', {
        url: '/edit/{id}',
        abstract: true,
        controller: 'reqCtrl',
        resolve: {
          req: function($http,$stateParams){
            return $http.get('/api/buyreqs/'+ $stateParams.id).then(response => {
              return response.data;
            })
            .catch(function(error){
              console.log(error);
            });
          }
        },
        templateProvider: function($mdMedia){
          if ($mdMedia('xs')){
            return '<div flex ng-include="\'app/req/reqMobile.html\'" layout="row"></div>';
          } else {
            return '<div flex ng-include="\'app/req/reqDesktop.html\'" layout="row"></div>';
          }
        }
      })
      .state('req.edit.views', {
        url: '',
        views: {
          'form': { templateUrl: 'app/req/reqForm/reqForm.html' },
          'map': { templateUrl: 'app/req/reqForm/reqFormMap.html' }
        }
      });
  });
