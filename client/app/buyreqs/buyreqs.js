'use strict';

angular.module('creapp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('buyreqs', {
        abstract: true,
        url: '/browse?broker',
        template: '<div flex layout="row" ui-view></div>',
        controller: 'BuyreqsCtrl',
        resolve: {
          buyReqs: function(buyreqsService){
            var api = '/api/buyreqs';
            return buyreqsService.getBuyReqs(api);
          },
          brokerSet: function(buyreqsService, $stateParams, $user, brokerService){
            if ($stateParams.broker){
              // api = '/api/buyreqs/brokerreqs/' + $stateParams.broker;
              brokerService.broker = 'My Broker';
              brokerService.brokerId = $stateParams.broker;
              brokerService.brokerOptions = ['Any', 'My Broker'];
              return true;
            } else {
              $user.get().then(function(currentUser){
                brokerService.broker = 'Any';
                brokerService.brokerOptions = ['Any', 'Me'];
                var href = currentUser.href;
                brokerService.brokerId = href.substr(href.lastIndexOf('/') + 1);
                return true;
              })
              .catch(function (error) {
                brokerService.broker = 'Any';
                brokerService.brokerOptions = ['Any'];
                brokerService.brokerId = '';
                console.log(error);
                return true;
              });
            }
          }
            // $user.get()
            //   .catch(function (error) {
            //     introService.showIntroPanel();
            //   });
        }
      })
      .state('buyreqs.browse', {
        abstract: true,
        templateProvider: function($mdMedia){
          if ($mdMedia('xs')){
            return '<div flex ng-include="\'app/buyreqs/reqList/reqListMobile.html\'" layout="row"></div>';
          } else {
            return '<div flex ng-include="\'app/buyreqs/reqList/reqListDesktop.html\'" layout="row"></div>';
          }
        }
      })
      .state('buyreqs.browse.views', {
        url: '',
        views: {
          'list': { templateUrl: 'app/buyreqs/reqList/reqList.html' },
          'map': { templateUrl: 'app/buyreqs/reqList/reqListMap.html' }
        }
      })



      .state('buyreqs.details', {
        abstract: true,
        templateProvider: function($mdMedia){
          if ($mdMedia('xs')){
            return '<div flex ng-include="\'app/buyreqs/reqDetails/reqDetailsMobile.html\'" layout="row"></div>';
          } else {
            return '<div flex ng-include="\'app/buyreqs/reqDetails/reqDetailsDesktop.html\'" layout="row"></div>';
          }
        },
        url: '/detail/{id}',
        resolve: {
          selectedReq: function($stateParams, $location, buyReqs, buyreqsService, brokerService, pictureuploadService){
            var getBrokerInfo = function(req){
              return buyreqsService.getBroker(req.user).then(function(broker){
                req.broker = broker;
                req.shareLink = $location.host + '/browse/detail/' + req._id;
                req.broker.brokerpic = pictureuploadService.getBrokerPictureLink(req.broker.userId);
                req.userIsOwner = (req.broker.userId === brokerService.brokerId);
                return req;
              })
              .catch(function(error){
                console.log(error);
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
        controller: function($scope, selectedReq, brokerService){
          $scope.main.selectedReq = selectedReq;
        }
      })
      .state('buyreqs.details.views', {
        url: '',
        views: {
          'broker': { templateUrl: 'app/buyreqs/reqDetails/reqBroker.html' },
          'brokerMobile': { templateUrl: 'app/buyreqs/reqDetails/reqBrokerMobile.html' },
          'details1': { templateUrl: 'app/buyreqs/reqDetails/reqDetails1.html' },
          'details2': { templateUrl: 'app/buyreqs/reqDetails/reqDetails2.html' },
          'details3': { templateUrl: 'app/buyreqs/reqDetails/reqDetails3.html' }
        },
      });

  });
