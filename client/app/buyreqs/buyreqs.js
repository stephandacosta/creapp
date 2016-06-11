'use strict';

angular.module('creapp3App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('buyreqs', {
        templateUrl: 'app/buyreqs/buyreqs.html',
        controller: 'BuyreqsCtrl',
        onExit: function(buyreqs){
          buyreqs.resetBuyreqs();
        }
      })
      .state('buyreqs.list', {
        url: '/',
        templateUrl: 'app/buyreqs/reqList/reqList.html',
        onEnter: function(buyreqs,$stateParams){
          buyreqs.updateUrl('/api/buyreqs');
          buyreqs.updateBuyReqs();
          buyreqs.updateSelectedReq();
        }
      })
      .state('buyreqs.detail', {
        url: '/detail/{id}',
        templateUrl: 'app/buyreqs/reqDetails/reqSummary.html',
        onEnter: function(buyreqs,$stateParams){
          buyreqs.updateUrl('/api/buyreqs');
          buyreqs.updateSelectedReq($stateParams.id);
        }
      })
      .state('myreqs', {
        url: '/myreqs',
        templateUrl: 'app/buyreqs/buyreqs.html',
        controller: 'BuyreqsCtrl',
        onExit: function(buyreqs){
          buyreqs.resetBuyreqs();
        },
        sp: {
          authenticate: true
        }
      })
      .state('myreqs.list', {
        url: '/list',
        templateUrl: 'app/buyreqs/reqList/reqList.html',
        onEnter: function(buyreqs,$stateParams){
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
        onEnter: function(buyreqs,$stateParams){
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
        onExit: function(buyreqs){
          buyreqs.resetBuyreqs();
        }
      })
      .state('brokerreqs.list', {
        url: '/list',
        templateUrl: 'app/buyreqs/reqList/reqList.html',
        onEnter: function(buyreqs,$stateParams){
          buyreqs.updateUrl('/api/buyreqs/brokerreqs/' + $stateParams.brokerId);
          buyreqs.updateBuyReqs();
          buyreqs.updateSelectedReq();
        }
      })
      .state('brokerreqs.detail', {
        url: '/detail/{id}',
        templateUrl: 'app/buyreqs/reqDetails/reqSummary.html',
        onEnter: function(buyreqs,$stateParams){
          buyreqs.updateUrl('/api/buyreqs');
          buyreqs.updateSelectedReq($stateParams.id);
        }
      });
  });
