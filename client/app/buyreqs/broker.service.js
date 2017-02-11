'use strict';

angular.module('creapp')
  .service('brokerService',function(){
    this.broker='';
    this.brokerId='';
    this.brokerOptions = ['Any', 'Me'];
  });
