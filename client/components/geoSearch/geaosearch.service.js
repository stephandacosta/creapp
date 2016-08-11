'use strict';

angular.module('creapp3App')
  .factory('geosearchService', function ($rootScope, $http, $mdPanel) {

    var mapSearchProcessor;
    var getLocation = function(query, callback, errorcallback){
      var url = 'https'+'://nominatim.openstreetmap.org/search?q='+query+'&limit=1&format=json&polygon_geojson=1&email=tech@creapp.us&json_callback=JSON_CALLBACK';
      $http.jsonp(url)
        .success(function(data){
          console.log(data);
          // callback(data);
          mapSearchProcessor(data);
        })
        .error(function(error){
          console.log(error);
          // errorcallback(error);
        });
    };

    var showInput = function () {

      var panelPosition = $mdPanel.newPanelPosition()
        .absolute()
        .left(window.innerWidth/2 + 'px')
        .top(window.innerHeight/2 + 'px');

      var config = {
        controller: geoInputPanelCtrl,
        controllerAs: 'geoInputCtrl',
        // locals : tooltipList[index],
        position: panelPosition,
        zIndex: 1000,
        panelClass : 'geoInput',
        templateUrl: 'components/geoSearch/geoSearch.html',
        clickOutsideToClose: true,
        escapeToClose: true,
        focusOnOpen: true,
        hasBackdrop: false
        // onDomRemoved: detachHotzones
      };

      var panelRef = $mdPanel.create(config);
      panelRef.open()
          .finally(function() {
            // var outerWrapper = document.getElementsByClassName('md-panel-outer-wrapper')[0];
            // outerWrapper.className += " tourPanelWrapper";
            panelRef = undefined;
          });
    };

    // suffix United States
    // geosearch._searchbox.oninput = function(){
    //   if (this.value === ', United States'){
    //     this.value = '';
    //   }
    //   if (this.value.length===1) {
    //     this.value = this.value + ', United States';
    //     if (this.createTextRange) {
    //       var part = this.createTextRange();
    //       part.move("character", 1);
    //       part.select();
    //     } else if (this.setSelectionRange){
    //       this.setSelectionRange(1, 1);
    //     }
    //       this.focus();
    //   }
    // }


    return {
      getLocation: getLocation,
      showInput : showInput,
      registerMapSearchProcessor: function(fun){
        mapSearchProcessor = fun;
      }
    };
  })


  .controller('geoInputPanelCtrl', geoInputPanelCtrl);

  var geoInputPanelCtrl = function(mdPanelRef, geosearchService){
    this._mdPanelRef = mdPanelRef;
    this.geoinput = '';
    this.closePanel = function(){
      this._mdPanelRef.close();
    };
    var getLocation = function(){
      geosearchService.getLocation(this.geoinput);
    };
    var getLocationBounded = getLocation.bind(this);

    this.geosearch = function(location){
      this._mdPanelRef.close()
      .finally(getLocationBounded);
    };
  };
