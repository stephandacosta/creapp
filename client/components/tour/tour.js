
angular.module('creapp3App')
    .factory('tourService', function($mdToast, $mdPanel, $mdMedia){

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
            msg: 'this is the list of buy/lease requirements available',
            parentClass: 'sellerTour1',
          },
          {
            msg: 'clicking on an item will open more details',
            parentClass: 'sellerTour2',
          },
          {
            msg: 'clicking the map filter will allow to filter with the map',
            parentClass: 'sellerTour3a',
          },
          {
            msg: 'moving the map will filter the list',
            parentClass: 'sellerTour3b',
          },
          {
            msg: 'some other filters are available through this button',
            parentClass: 'sellerTour4',
          }
        ],
        broker : [
          {
            msg: 'this is the list of buy/lease requirements available',
            parentClass: 'brokerTour1',
          },
          {
            msg: 'clicking on an item will open more details including contacts',
            parentClass: 'brokerTour2',
          },
          {
            msg: 'you will first need to register by providing your RE#',
            parentClass: 'brokerTour3',
          },
          {
            msg: 'once logged in clicking on add button will open buyer requirement form',
            parentClass: 'brokerTour4',
          },
          {
            msg: 'also fill in your profile details so that sellers can contact you',
            parentClass: 'brokerTour5',
          },
          {
            msg: 'feel free to contact us if you have any question',
          },
        ]
    }

      var index = 0;

      var nextTooltip = function(){
        if (++index < tooltipList.length ){
          showCustomPanel();
        } else {
          index = 0;
        }
      };


      var panelRef;

      var detachHotzones = function(){
        var hotzone = document.getElementsByClassName('hotzone');
        angular.element(hotzone).detach();
      };

      var attachHotzone = function(hotElement){
        var parentRect = hotElement.getBoundingClientRect();
        var xCoord = (parentRect.left + parentRect.right)/2-25;
        var yCoord = (parentRect.top + parentRect.bottom)/2-25;

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
        tooltipList[index].index = index+1;
        tooltipList[index].steps = tooltipList.length;

        if (tooltipList[index].parentClass){
          var parent = document.getElementsByClassName(tooltipList[index].parentClass)[0];
          var hotzone = attachHotzone(parent);
          var xCoord = parseFloat(hotzone.css('left'));
          var yCoord = parseFloat(hotzone.css('top'));
        } else {
          var xCoord = window.innerWidth/2;
          var yCoord = window.innerHeight/2;
        }

        if ($mdMedia('xs')) {
          // mobile
          var yPosition = yCoord >= window.innerHeight/2 ? (yCoord-230)+'px' : (yCoord+60)+'px';
          var panelPosition = $mdPanel.newPanelPosition()
              .absolute()
              .left('15px')
              .top(yPosition);
        } else if (tooltipList[index].parentClass){
          // tablets or desktop with hotzone
          var xPosition = xCoord <= window.innerWidth/2 ? 'offset-end' : 'offset-start';
          var yPosition = yCoord >= window.innerHeight/2 ? 'above' : 'below';
          var panelPosition = $mdPanel.newPanelPosition()
              .relativeTo(document.getElementsByClassName('hotzone')[0])
              .addPanelPosition(xPosition,yPosition);
        } else {
          // tablets or desktop without hotzone
          var yPosition = yCoord >= window.innerHeight/2 ? (yCoord-230)+'px' : (yCoord+60)+'px';
          var panelPosition = $mdPanel.newPanelPosition()
              .absolute()
              .left((xCoord-100) + 'px')
              .top(yPosition);
        }

        var config = {
          controller: panelCtrl,
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
        }
        panelRef = $mdPanel.create(config);
        panelRef.open()
            .finally(function() {
              var outerWrapper = document.getElementsByClassName('md-panel-outer-wrapper')[0];
              outerWrapper.className += " tourPanelWrapper";
              panelRef = undefined;
            });
      };

      return {
        showTour : function(tourType) {
          // alreadySeen=false;
          tooltipList = tooltipLists[tourType];
          showCustomPanel();
        },
        nextPanel : nextTooltip,
        resetTour : function(){index=0;},
        detachHotzones : detachHotzones
      };


    })
  .controller('panelCtrl', panelCtrl);

    var panelCtrl = function(mdPanelRef, tourService){
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
      }
    };
