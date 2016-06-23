
angular.module('creapp3App')
    .factory('tourService', function($mdToast, $mdPanel){

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

      var tooltipList;
      var tooltipLists = {
        seller : [
          {
            msg: 'this is the list of buyer requirements available',
            parentClass: 'sellerTour1',
            xPosition: 'center',
            yPosition: 'center'
          },
          {
            msg: 'clicking on an item will open more details including contacts',
            parentClass: 'sellerTour2',
            xPosition: 'center',
            yPosition: 'below'
          },
          {
            msg: 'moving the map will filter the list',
            parentClass: 'sellerTour3',
            xPosition: 'offset-end',
            yPosition: 'below'
          },
          {
            msg: 'some other filters are available through this button',
            parentClass: 'sellerTour4',
            xPosition: 'offset-end',
            yPosition: 'center'
          }
      ],
      broker : [
        {
          msg: 'this is the list of buyer requirements available',
          parentClass: 'brokerTour1',
          xPosition: 'center',
          yPosition: 'center'
        },
        {
          msg: 'clicking on an item will open more details including contacts',
          parentClass: 'brokerTour2',
          xPosition: 'center',
          yPosition: 'center'
        },
        {
          msg: 'you will first need to register by providing your RE#',
          parentClass: 'brokerTour3',
          xPosition: 'center',
          yPosition: 'center'
        },
        {
          msg: 'once logged in clicking on add button will open buyer requirement form',
          parentClass: 'brokerTour4',
          xPosition: 'center',
          yPosition: 'center'
        },
        {
          msg: 'also fill in your profile details so that sellers can contact you',
          parentClass: 'brokerTour5',
          xPosition: 'center',
          yPosition: 'below'
        },
        {
          msg: 'feel free to contact us if you have any question',
          parentClass: 'brokerTour6',
          xPosition: 'center',
          yPosition: 'below'
        },
      ]
    }

      var alreadySeen = false;
      var index = 0

      var nextTooltip = function(){
        if (++index < tooltipList.length ){
          showCustomPanel();
        } else {
          index = 0;
        }
      };


      var panelRef;
      var showCustomPanel = function () {
        tooltipList[index].index = index+1;
        tooltipList[index].steps = tooltipList.length;
        var panelPosition = $mdPanel.newPanelPosition()
            .relativeTo(document.getElementsByClassName(tooltipList[index].parentClass)[0])
            .addPanelPosition(tooltipList[index].xPosition,tooltipList[index].yPosition);
        // var panelAnimation = $mdPanelAnimation
        //     .targetEvent($event)
        //     .defaultAnimation('md-panel-animate-fly')
        //     .closeTo('.show-button');
        var config = {
          // attachTo: toolTipList[index].parent,
          controller: panelCtrl,
          controllerAs: 'tourPanel',
          locals : tooltipList[index],
          position: panelPosition,
          // animation: panelAnimation,
          // targetEvent: $event,
          templateUrl: 'components/tour/tour.html',
          clickOutsideToClose: true,
          escapeToClose: true,
          focusOnOpen: true,
          hasBackdrop: false
        }
        panelRef = $mdPanel.create(config);
        panelRef.open()
            .finally(function() {
              document.getElementsByClassName('md-panel-outer-wrapper')[0].style.zIndex=1000;
              panelRef = undefined;
            });
      }

      return {
        showTour : function(tourType) {
          if (alreadySeen) {
            return;
          } else {
            alreadySeen=false;
            tooltipList = tooltipLists[tourType];
            showCustomPanel();
          }
        },
        nextPanel : nextTooltip,
        resetTour : function(){index=0;}
      };


    })
  .controller('panelCtrl', panelCtrl);
    var panelCtrl = function(mdPanelRef, tourService){
      this._mdPanelRef = mdPanelRef;
      // $scope.msg = locals.msg;
      this.closePanel = function(){
        this._mdPanelRef.close();
      };
      this.nextPanel = function(){
        // tourService.nextPanel();
        this._mdPanelRef.close()
          .finally(function(){
            tourService.nextPanel();
          });
      }
    };
