'use strict';

angular.module('creapp')
  .controller('tourPanelCtrl', function(mdPanelRef, tourService){
    this._mdPanelRef = mdPanelRef;
    // $scope.msg = locals.msg;
    this.closePanel = function(){
      this._mdPanelRef.close()
      .finally(function(){
        tourService.resetTour();
      });
    };
    this.nextPanel = function(){
      // tourService.nextPanel();
      var hotzone = document.getElementsByClassName('hotzone');
      angular.element(hotzone).detach();
      this._mdPanelRef.close()
        .finally(function(){
          tourService.nextPanel();
        });
    };
  });
