'use strict';

angular.module('creapp3App')
  .controller('introCtrl', function(mdPanelRef, introService, tourService, $http, $mdToast, broker){
    if(broker){
      this.broker = broker;
    }
    var showToast = function(msg){
      $mdToast.show(
        $mdToast.simple()
        .textContent(msg)
        .position('top left')
        .parent(document.getElementById('toasts'))
        .hideDelay(3000)
      );
    };
    this._mdPanelRef = mdPanelRef;
    // $scope.msg = locals.msg;
    this.closePanel = function(){
      this._mdPanelRef.close();
    };
    this.startTour = function(tourType){
      this._mdPanelRef.close()
      .finally(function(){
        tourService.showTour(tourType);
      });
    };
    this.showIntroCard = function(introType){
      this._mdPanelRef.close()
      .finally(function(){
        introService.showIntroCard(introType);
      });
    };
    this.buyer = {
      email: '',
      message: ''
    };
    this.sendBuyerInfo = function(){
      var panel = this._mdPanelRef
      var success = function(){
        panel.close()
        .finally(function(){
          showToast('Thanks. Your message was sent');
        });
      };
      var fail = function(){
        panel.close()
        .finally(function(){
          showToast('There was an issue sending your message');
        });
      };
      $http.post('/api/leads', {
        email: this.buyer.email,
        message: this.buyer.message
      }).then(success, fail);
    };

  });
