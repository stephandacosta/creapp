'use strict';

angular.module('creapp')
  .factory('introService', function($mdToast, $mdPanel, $timeout, $mdMedia){

    var panelRef;
    var panelPosition;

    // General Intro Panel to select type of user
    var showIntroPanel = function () {
      if ($mdMedia('gt-sm')){
        panelPosition = $mdPanel.newPanelPosition()
        .absolute()
        .right('25%')
        .top('10%');
      } else {
          panelPosition = $mdPanel.newPanelPosition()
          .absolute()
          .left('10px')
          .top('10%');
      }
      var config = {
        // attachTo: toolTipList[index].parent,
        controller: 'introCtrl',
        controllerAs: 'introPanel',
        locals: {
          broker : undefined
        },
        position: panelPosition,
        templateUrl: 'components/intro/intro.html',
        clickOutsideToClose: true,
        escapeToClose: true,
        focusOnOpen: true,
        panelClass : ($mdMedia('xs')? 'introPanel-small' : 'introPanel-large')
        // fullscreen: true
      };
      panelRef = $mdPanel.create(config);
      panelRef.open()
      .finally(function() {
        document.getElementsByClassName('md-panel-outer-wrapper')[0].style.zIndex=1000;
        panelRef = undefined;
      });
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
        locals: {
          broker : undefined
        },
        clickOutsideToClose: true,
        escapeToClose: true,
        focusOnOpen: true,
        panelClass : ($mdMedia('xs')? 'introCard-small' : 'introCard-large'),
        fullscreen: true
      };
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
      };
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
    };
  });
