'use strict';

angular.module('creapp3App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('buyreqs', {
        url: '/buyreqs',
        templateUrl: 'app/buyreqs/buyreqs.html',
        controller: 'BuyreqsCtrl'
      })
      .state('buyreqs.list', {
        url: '/list',
        templateUrl: 'app/buyreqs/reqList/reqList.html',
        controller: function(buyreqs){
          buyreqs.updateUrl('/api/buyreqs');
          buyreqs.updateBuyReqs();
          buyreqs.updateSelectedReq();
        }
      })
      .state('buyreqs.detail', {
        url: '/detail/{id}',
        templateUrl: 'app/buyreqs/reqDetails/reqSummary.html',
        controller: function($stateParams, buyreqs){
          buyreqs.updateUrl('/api/buyreqs');
          buyreqs.updateSelectedReq($stateParams.id);
        }
      })
      .state('myreqs', {
        url: '/myreqs',
        templateUrl: 'app/buyreqs/buyreqs.html',
        controller: 'BuyreqsCtrl',
        sp: {
          authenticate: true
        }
      })
      .state('myreqs.list', {
        url: '/list',
        templateUrl: 'app/buyreqs/reqList/reqList.html',
        controller: function(buyreqs){
          buyreqs.updateUrl('/api/buyreqs/myreqs');
          buyreqs.updateBuyReqs();
          buyreqs.updateSelectedReq();
        },
        sp: {
          authenticate: true
        }
      })
      .state('myreqs.detail', {
        url: '/detail/{id}',
        templateUrl: 'app/buyreqs/reqDetails/reqSummary.html',
        controller: function($stateParams, buyreqs){
          buyreqs.updateUrl('/api/buyreqs/myreqs');
          buyreqs.updateSelectedReq($stateParams.id);
        },
        sp: {
          authenticate: true
        }
      })
      .state('brokerreqs', {
        url: '/broker/{brokerId}',
        templateUrl: 'app/buyreqs/buyreqs.html',
        controller: 'BuyreqsCtrl',
      })
      .state('brokerreqs.list', {
        url: '/list',
        templateUrl: 'app/buyreqs/reqList/reqList.html',
        controller: function(buyreqs, $state, $stateParams){
          buyreqs.updateUrl('/api/buyreqs/brokerreqs/' + $stateParams.brokerId);
          buyreqs.updateBuyReqs();
          buyreqs.updateSelectedReq();
        }
      })
      .state('brokerreqs.detail', {
        url: '/detail/{id}',
        templateUrl: 'app/buyreqs/reqDetails/reqSummary.html',
        controller: function($stateParams, buyreqs){
          buyreqs.updateSelectedReq($stateParams.id);
        }
      });
  });
