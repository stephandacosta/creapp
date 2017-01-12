'use strict';

angular.module('creapp3App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('buyreqs', {
        abstract: true,
        template: '<div flex layout="row" ui-view></div>',
        controller: 'BuyreqsCtrl',
        resolve: {
          buyReqs: function(buyreqsService){
            return buyreqsService.getBuyReqs('/api/buyreqs');
          }
            // $user.get()
            //   .catch(function (error) {
            //     introService.showIntroPanel();
            //   });
        }
      })
      .state('buyreqs.browse', {
        abstract: true,
        url: '/browse',
        templateUrl: 'app/buyreqs/reqList/reqListDesktop.html',
      })
      .state('buyreqs.browse.views', {
        url: '',
        views: {
          'list': { templateUrl: 'app/buyreqs/reqList/reqList.html' }
        }
      })


      .state('buyreqs.details', {
        abstract: true,
        url: '/detail/{id}',
        templateUrl: 'app/buyreqs/reqDetails/reqDetailsDesktop.html',
        resolve: {
          selectedReq: function($stateParams, $location, buyReqs, buyreqsService){
            var getBrokerInfo = function(req){
              return buyreqsService.getBroker(req.user).then(function(broker){
                req.broker = broker;
                req.shareLink = $location.host + '/broker/' + req.broker.userId + '/detail/' + req._id;
                return req;
              });
            };

            var req = _.find(buyReqs, { '_id': $stateParams.id });
            if (req && req.broker) {
              return req;
            } else if (req) {
              return getBrokerInfo(req);
            } else {
              return buyreqsService.getSelectedReq($stateParams.id)
              .then(function(req){
                return getBrokerInfo(req);
              });
            }
          }
        },
        controller: function($scope, selectedReq){
          $scope.main.selectedReq = selectedReq;
        }
      })
      .state('buyreqs.details.views', {
        url: '',
        views: {
          'broker': { templateUrl: 'app/buyreqs/reqDetails/reqBroker.html' },
          'details1': { templateUrl: 'app/buyreqs/reqDetails/reqDetails1.html' },
          'details2': { templateUrl: 'app/buyreqs/reqDetails/reqDetails2.html' },
          'details3': { templateUrl: 'app/buyreqs/reqDetails/reqDetails3.html' }
        },
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
        onEnter: function(buyreqs,$stateParams, mapService){
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
        resolve: {
          broker : function($http, $stateParams){
            return $http.get('/api/users/' + $stateParams.brokerId).then (function (response) {
              return response.data;
            });
          }
        },
        onEnter: function(introService,broker){
          introService.showBrokerPanel(broker);
        },
        onExit: function(buyreqs){
          buyreqs.resetBuyreqs();
        }
      })
      .state('brokerreqs.list', {
        url: '/list',
        templateUrl: 'app/buyreqs/reqList/reqList.html',
        onEnter: function(buyreqs,$stateParams, mapService){
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
