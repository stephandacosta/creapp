'use strict';

angular.module('creapp')
    .factory('tourService', function($mdToast, $mdPanel, $mdMedia, $mdSidenav, $user, $timeout){

      // MdPanelPosition.xPosition = {
      //   CENTER: 'center',
      //   ALIGN_START: 'align-start',
      //   ALIGN_END: 'align-end',
      //   OFFSET_START: 'offset-start',
      //   OFFSET_END: 'offset-end'
      // };
      //
      // MdPanelPosition.yPosition = {
      //   CENTER: 'center',
      //   ALIGN_TOPS: 'align-tops',
      //   ALIGN_BOTTOMS: 'align-bottoms',
      //   ABOVE: 'above',
      //   BELOW: 'below'

      var index = 0;
      var tooltipList;
      var panelPosition;
      var panelRef;

      var tooltipLists = {
        seller : [
          {
            msg: 'this is the list of buy/lease requirements available for sellers to search',
            parentClass: 'tour-list'
          },
          {
            msg: 'these requirements are shown on the map',
            parentClass: 'tour-map',
            condition: function(){
              return $mdMedia('gt-xs');
            }
          },
          {
            msg: 'these requirements are shown on the map',
            parentClass: 'tour-map-mob',
            condition: function(){
              return $mdMedia('xs');
            }
          },
          {
            msg: 'you can filter the requirements to only those shwon on the map',
            parentClass: 'tour-map-filter',
            condition: function(){
              return $mdMedia('gt-xs');
            }
          },
          {
            msg: 'you can filter the requirements to only those shwon on the map',
            parentClass: 'tour-map-filter',
            condition: function(){
              return $mdMedia('xs');
            },
            action: function(){
              return $timeout(function(){
                angular.element(document.querySelectorAll('.tour-map-mob')).triggerHandler('click');
              },0);
            }
          },
          {
            msg: 'clicking on an item will open more details including contacts',
            parentClass: 'tour-list',
            condition: function(){
              return $mdMedia('gt-xs');
            },
          },
          {
            msg: 'clicking on an item will open more details including contacts',
            parentClass: 'tour-list',
            condition: function(){
              return $mdMedia('xs');
            },
            action: function(){
              return $timeout(function(){
                angular.element(document.querySelectorAll('.tour-map-mob')).triggerHandler('click');
              },0);
            }
          },
          {
            msg: 'some other filters are available through this button',
            parentClass: 'tour-filter-desk',
            condition: function(){
              return $mdMedia('gt-xs');
            }
          },
          {
            msg: 'some other filters are available through this button',
            parentClass: 'tour-filter-mob',
            condition: function(){
              return $mdMedia('xs');
            }
          },
          {
            msg: 'feel free to contact us if you have any question',
            parentClass: 'tour-about',
            action: function(){
              return $mdSidenav('left').open();
            }
          }
        ],
        broker : [
          {
            msg: 'this is the list of buy/lease requirements available for sellers to search',
            parentClass: 'tour-list'
          },
          {
            msg: 'these requirements are shown on the map',
            parentClass: 'tour-map',
            condition: function(){
              return $mdMedia('gt-xs');
            }
          },
          {
            msg: 'these reuirements are shown on the map',
            parentClass: 'tour-map-mob',
            condition: function(){
              return $mdMedia('xs');
            }
          },
          {
            msg: 'you can filter the requirements to only those shwon on the map',
            parentClass: 'tour-map-filter',
            condition: function(){
              return $mdMedia('gt-xs');
            }
          },
          {
            msg: 'you can filter the requirements to only those shwon on the map',
            parentClass: 'tour-map-filter',
            condition: function(){
              return $mdMedia('xs');
            },
            action: function(){
              return $timeout(function(){
                angular.element(document.querySelectorAll('.tour-map-mob')).triggerHandler('click');
              },0);
            }
          },
          {
            msg: 'clicking on an item will open more details including contacts',
            parentClass: 'tour-list',
            condition: function(){
              return $mdMedia('gt-xs');
            },
          },
          {
            msg: 'clicking on an item will open more details including contacts',
            parentClass: 'tour-list',
            condition: function(){
              return $mdMedia('xs');
            },
            action: function(){
              return $timeout(function(){
                angular.element(document.querySelectorAll('.tour-map-mob')).triggerHandler('click');
              },0);
            }
          },
          {
            msg: 'you will first need to register by providing your RE#',
            parentClass: 'tour-register',
            action: function(){
              return $mdSidenav('left').open();
            },
            condition: function(){
              return !($user.currentUser);
            }
          },
          {
            msg: 'also fill in your profile details so that sellers can contact you',
            parentClass: 'tour-register',
            action: function(){
              return $mdSidenav('left').open();
            },
            condition: function(){
              return !($user.currentUser);
            }
          },
          {
            msg: 'you will first need to register by providing your RE#',
            parentClass: 'tour-profile',
            action: function(){
              return $mdSidenav('left').open();
            },
            condition: function(){
              return !!($user.currentUser);
            }
          },
          {
            msg: 'also fill in your profile details so that sellers can contact you',
            parentClass: 'tour-profile',
            action: function(){
              return $mdSidenav('left').open();
            },
            condition: function(){
              return !!($user.currentUser);
            }
          },
          {
            msg: 'once logged in, you can create a new requirement',
            parentClass: 'tour-create',
            action: function(){
              return $mdSidenav('left').open();
            }
          },
          {
            msg: 'feel free to contact us if you have any question',
            parentClass: 'tour-about',
            action: function(){
              return $mdSidenav('left').open();
            }
          }
        ]
      };
      
      var detachHotzones = function(){
        var hotzone = document.getElementsByClassName('hotzone');
        angular.element(hotzone).detach();
      };

      var attachHotzone = function(hotElement){
        var xCoord, yCoord;
        var parentRect = hotElement.getBoundingClientRect();
        xCoord = (parentRect.left + parentRect.right)/2-25;
        yCoord = (parentRect.top + parentRect.bottom)/2-25;

        var hotzone = angular.element('<div class="hotzone"></div>');
        hotzone.css({
          'left': xCoord + 'px',
          'top': yCoord + 'px',
        });

        var body = document.getElementsByTagName('body')[0];
        angular.element(body).append(hotzone);
        // $compile(hotzone)($scope);
        return hotzone;
      };

      var showCustomPanel = function () {
        var yPosition, xPosition;
        var xCoord, yCoord;
        tooltipList[index].index = index+1;
        tooltipList[index].steps = tooltipList.length;

        if (tooltipList[index].parentClass){
          var parent = document.getElementsByClassName(tooltipList[index].parentClass)[0];
          var hotzone = attachHotzone(parent);
          xCoord = parseFloat(hotzone.css('left'));
          yCoord = parseFloat(hotzone.css('top'));
        } else {
          xCoord = window.innerWidth/2;
          yCoord = window.innerHeight/2;
        }

        if ($mdMedia('xs')) {
          // mobile
          yPosition = yCoord >= window.innerHeight/2 ? (yCoord-230)+'px' : (yCoord+60)+'px';
          panelPosition = $mdPanel.newPanelPosition()
              .absolute()
              .left('15px')
              .top(yPosition);
        } else if (tooltipList[index].parentClass){
          // tablets or desktop with hotzone
          xPosition = xCoord <= window.innerWidth/2 ? 'offset-end' : 'offset-start';
          yPosition = yCoord >= window.innerHeight/2 ? 'above' : 'below';
          panelPosition = $mdPanel.newPanelPosition()
              .relativeTo(document.getElementsByClassName('hotzone')[0])
              .addPanelPosition(xPosition,yPosition);
        } else {
          // tablets or desktop without hotzone
          yPosition = yCoord >= window.innerHeight/2 ? (yCoord-230)+'px' : (yCoord+60)+'px';
          panelPosition = $mdPanel.newPanelPosition()
              .absolute()
              .left((xCoord-100) + 'px')
              .top(yPosition);
        }

        var config = {
          controller: 'tourPanelCtrl',
          controllerAs: 'tourPanel',
          locals : tooltipList[index],
          position: panelPosition,
          zIndex: 1000,
          panelClass : ($mdMedia('xs')? 'tourPanel-small' : 'tourPanel-large'),
          templateUrl: 'components/tour/tour.html',
          clickOutsideToClose: true,
          escapeToClose: true,
          focusOnOpen: true,
          hasBackdrop: false,
          onDomRemoved: detachHotzones
        };
        panelRef = $mdPanel.create(config);
        panelRef.open()
            .finally(function() {
              var outerWrapper = document.getElementsByClassName('md-panel-outer-wrapper')[0];
              outerWrapper.className += ' tourPanelWrapper';
              panelRef = undefined;
            });
      };

      var nextTooltip = function(){
        if (++index <= tooltipList.length ){
          if (_.isUndefined(tooltipList[index].condition) || tooltipList[index].condition()){
            if (!_.isUndefined(tooltipList[index].action)){
              tooltipList[index].action().then(function(){
                showCustomPanel();
              });
            } else {
              showCustomPanel();
            }
          } else {
            nextTooltip();
          }
        } else {
          index = 0;
        }
      };

      return {
        showTour : function(tourType) {
          // alreadySeen=false;
          tooltipList = tooltipLists[tourType];
          index = 0;
          showCustomPanel();
        },
        nextPanel : nextTooltip,
        resetTour : function(){index = 0;},
        detachHotzones : detachHotzones
      };


    });
