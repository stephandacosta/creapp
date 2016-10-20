'use strict';

angular.module('creapp3App')
  .factory('geosearchService', function ($rootScope, $http, $mdPanel, $mdMedia) {

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

    var getReverseGeoSearch = function(lat, lon, callback){
      var url = 'https'+'://nominatim.openstreetmap.org/reverse?format=json&email=tech@creapp.us&lat='+lat+'&lon='+lon+'&json_callback=JSON_CALLBACK';
      $http.jsonp(url)
        .success(function(data){
          callback(data);
        })
        .error(function(error){
          console.log(error);
          // errorcallback(error);
        });
    };

    var showInput = function () {

      var panelPosition = $mdPanel.newPanelPosition()
        .absolute()
        .left((window.innerWidth/2 - 150) + 'px')
        .top((window.innerHeight/2 - 150) + 'px');

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
        hasBackdrop: false,
        fullscreen: $mdMedia('xs')
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


    return {
      getLocation: getLocation,
      showInput : showInput,
      registerMapSearchProcessor: function(fun){
        mapSearchProcessor = fun;
      },
      getReverseGeoSearch: getReverseGeoSearch
    };

  })
