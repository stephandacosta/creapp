angular.module('creapp3App')
  .factory('introService', function($mdToast, $mdPanel, $timeout, $mdMedia, tourService){

    var panelRef;
    var alreadySeen = false;

    // General Intro Panel to select type of user
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
          panelRef = undefined;
          alreadySeen = true;
        });
      }
    };

    // Specific Intro Card for selected type of user
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
        panelRef = undefined;
      });
    };

    // Specific Intro Card for selected type of user
    var showBrokerPanel= function (broker) {
      var panelPosition = $mdPanel.newPanelPosition()
      .absolute()
      .center();
      var config = {
        attachTo: angular.element(document.body),
        controller: 'introCtrl',
        controllerAs: 'introPanel',
        position: panelPosition,
        templateUrl: 'components/intro/brokerPage.html',
        locals: {
          broker : broker
        },
        clickOutsideToClose: true,
        escapeToClose: true,
        focusOnOpen: true,
        panelClass : ($mdMedia('xs')? 'brokerPanel-small' : 'brokerPanel-large'),
        // hasBackdrop: true,
        fullscreen: true,
        zIndex: 1000
      }
      panelRef = $mdPanel.create(config);
      panelRef.open()
      .finally(function() {
        document.getElementsByClassName('md-panel-outer-wrapper')[0].style.zIndex=1000;
        panelRef = undefined;
      });
    };

    return {
      showIntroPanel : showIntroPanel,
      showIntroCard : showIntroCard,
      showBrokerPanel : showBrokerPanel,
      resetAlreadySeen : function(){alreadySeen=false;}
    };


  })
  .controller('introCtrl', function(mdPanelRef, introService, tourService, $http, $mdToast, broker){
    this.broker = broker;
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
