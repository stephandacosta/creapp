'use strict';

angular.module('creapp3App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mailbox', {
        url: '/mailbox',
        template: '<mailbox></mailbox>'
      });
  });
