angular.module('creapp3App')
  .factory('introService', function($mdToast, $mdPanel, $timeout, tourService){

    var panelRef;
    var alreadySeen = false;
    var showIntroPanel = function () {
      if (!alreadySeen){
        var panelPosition = $mdPanel.newPanelPosition()
        .absolute()
        .top('20%')
        .left('5%');
        var config = {
          // attachTo: toolTipList[index].parent,
          controller: 'introCtrl',
          controllerAs: 'introPanel',
          position: panelPosition,
          templateUrl: 'components/intro/intro.html',
          clickOutsideToClose: true,
          escapeToClose: true,
          focusOnOpen: true
        }
        panelRef = $mdPanel.create(config);
        panelRef.open()
        .finally(function() {
          document.getElementsByClassName('md-panel-outer-wrapper')[0].style.zIndex=1000;
          panelRef = undefined;
          alreadySeen = true;
        });
      }
    }

    return {
      showIntroPanel : showIntroPanel,
      resetAlreadySeen : function(){alreadySeen=false;}
    };


  })
  .controller('introCtrl', function(mdPanelRef, tourService){
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
  });
