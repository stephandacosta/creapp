angular.module('creapp3App')
  .factory('introService', function($mdToast, $mdPanel, $timeout, $mdMedia, tourService){

    var panelRef;
    var alreadySeen = false;
    var showIntroPanel = function () {
      if (!alreadySeen){
        var panelPosition = $mdPanel.newPanelPosition()
        .absolute()
        .right('25%')
        .top('10%');
        var config = {
          // attachTo: toolTipList[index].parent,
          controller: 'introCtrl',
          controllerAs: 'introPanel',
          position: panelPosition,
          templateUrl: 'components/intro/intro.html',
          clickOutsideToClose: true,
          escapeToClose: true,
          focusOnOpen: true,
          panelClass : ($mdMedia('xs')? 'introPanel-small' : 'introPanel-large')
          // fullscreen: true
        }
        panelRef = $mdPanel.create(config);
        panelRef.open()
        .finally(function() {
          document.getElementsByClassName('md-panel-outer-wrapper')[0].style.zIndex=1000;
          document.getElementsByClassName('md-panel-outer-wrapper')[0].style.backgroundColor='rgba(29, 51, 49, 0.22)';
          panelRef = undefined;
          alreadySeen = true;
        });
      }
    };

    var showIntroCard= function (type) {
      var panelPosition = $mdPanel.newPanelPosition()
      .absolute()
      .right('25%')
      .top('10%');
      var config = {
        // attachTo: toolTipList[index].parent,
        controller: 'introCtrl',
        controllerAs: 'introPanel',
        position: panelPosition,
        templateUrl: 'components/intro/intro'+type+'.html',
        clickOutsideToClose: true,
        escapeToClose: true,
        focusOnOpen: true,
        panelClass : ($mdMedia('xs')? 'introCard-small' : 'introCard-large')
        // fullscreen: true
      }
      panelRef = $mdPanel.create(config);
      panelRef.open()
      .finally(function() {
        document.getElementsByClassName('md-panel-outer-wrapper')[0].style.zIndex=1000;
        // document.getElementsByClassName('md-panel-outer-wrapper')[0].style.backgroundColor='rgba(29, 51, 49, 0.22)';
        panelRef = undefined;
      });
    };

    return {
      showIntroPanel : showIntroPanel,
      showIntroCard : showIntroCard,
      resetAlreadySeen : function(){alreadySeen=false;}
    };


  })
  .controller('introCtrl', function(mdPanelRef, introService, tourService, $http, $mdToast){
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
