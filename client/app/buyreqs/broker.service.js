'use strict';

angular.module('creapp3App')
  .service('brokerService',function(){
    this.broker='';
    this.brokerId='';
    this.brokerOptions = ['Any', 'Me'];
  });
