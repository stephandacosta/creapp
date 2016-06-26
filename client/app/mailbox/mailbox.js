'use strict';

angular.module('creapp3App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mailbox', {
        // url: '/mailbox',
        templateUrl: 'app/mailbox/mailbox.html',
        controller: 'mailboxCtrl',
        sp: {
          authenticate: true
        }
      })
      .state('mailbox.views', {
        url: '/mailbox',
        views: {
          'list' : {
            templateUrl: 'app/mailbox/mailboxList.html',
          },
          'detail' : {
            templateUrl: 'app/mailbox/mailboxDetail.html',
          }
        },
        sp: {
          authenticate: true
        }
      });
  });
