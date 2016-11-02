'use strict';

angular.module('creapp3App')
  .factory('geosearchService', function ($rootScope, $http, $mdPanel, $mdMedia, appConstants) {

    var mapSearchProcessor;
    // location service that processes result in current map

    var registerMap = function(map){
      mapSearchProcessor = function(obj){
        map.panTo(obj.point);
        map.fitBounds(obj.bbox);
        // searchLayer.addLayer(L.polygon(latlngs, {className:'searchresult'})
        // .setStyle({color:'rgba(0, 150, 136, 0.78)', fillColor: 'rgba(0, 150, 136, 0.78)'}));
        // .on('click', function(e) {
        //   searchLayer.clearLayers();
        //  });
        // .on('click contextmenu', function(e) {
        //   $state.go('^.detail',{id: req._id });
        // }));
        // map.fitBounds( obj[0].boundingbox<LatLngBounds> bounds, <fitBounds options> options? )
        L.marker(obj.point).bindPopup('<div>marker popoup</div>').openPopup().addTo(map);
        // marker.bindPopup(popupContent).openPopup();
      };
    };

    var getLocationNomatim = function(query){
      var encodedQuery = encodeURIComponent(query);
      var url = 'https'+'://nominatim.openstreetmap.org/search?q='+encodedQuery+'&limit=1&format=json&polygon_geojson=1&email=tech@creapp.us&json_callback=JSON_CALLBACK';

      $http.jsonp(url)
        .success(function(data){
          if (data.length > 0){
            var parsedResults = {};
            if (data[0].geojson.coordinates[0][0].length>=3){
              parsedResults.multipolygon = data[0].geojson.coordinates.map(function(geoarray){
                return geoarray[0].map(function(lnglat){
                  return [lnglat[1],lnglat[0]];
                });
              });
            }
            parsedResults.point = [data[0].lat, data[0].lon];
            parsedResults.bbox = data[0].boundingbox;
            mapSearchProcessor(parsedResults);
          };
        })
        .error(function(error){
          console.log(error);
          // errorcallback(error);
        });
    };


    var getLocation = function(query){
      // console.log('query', query);
      var encodedQuery = encodeURIComponent(query);
      var url = 'https'+'://dev.virtualearth.net/REST/v1/Locations?q='+encodedQuery+'&include=ciso2&include=neighborhood&o=json&jsonp=JSON_CALLBACK&key=AkQXcyq56oIk_a0AzgsOgRCdHNQThZNISRSWCaQMTM9ujyJdcCo2H8xjzlBxC-Ln';
      // console.log('sending');
      $http.jsonp(url)
        .success(function(data){
          // console.log(data);
            var parsedResults = {
              point : data.resourceSets[0].resources[0].geocodePoints[0].coordinates,
              bbox : [
                [data.resourceSets[0].resources[0].bbox[0],data.resourceSets[0].resources[0].bbox[1]],
                [data.resourceSets[0].resources[0].bbox[2],data.resourceSets[0].resources[0].bbox[3]]
              ],
              address : {
                formattedAddress : data.resourceSets[0].resources[0].address.formattedAddress || '',
                state : data.resourceSets[0].resources[0].address.adminDistrict || '',
                country : data.resourceSets[0].resources[0].address.CountryRegionIso2 || '',
                addressLine : data.resourceSets[0].resources[0].address.AddressLine || '',
                neighborhood : data.resourceSets[0].resources[0].address.Neighborhood || '',
                locality : data.resourceSets[0].resources[0].address.Locality || '',
                city : data.resourceSets[0].resources[0].address.AdminDistrict2 || '',
                postcode : data.resourceSets[0].resources[0].address.PostalCode || '',
                landmark : data.resourceSets[0].resources[0].address.landmark || '',
                neighborhood : data.resourceSets[0].resources[0].address.neighborhood || ''
              },
              type: data.resourceSets[0].resources[0].entityType || ''
            };

          // callback(data);
          mapSearchProcessor(parsedResults);
        })
        .error(function(error){
          console.log(error);
          // errorcallback(error);
        });
    };


    var getStateCode = function(stateName){
      var stateObj = appConstants.states.filter(function(obj){
        return (obj.name === stateName.toUpperCase());
      });
      if (stateObj.length){
        return stateObj[0].iso;
      } else {
        return 'unknown';
      }
    }


    var getReverseGeoSearch = function(lat, lon, callback){
      var url = 'https'+'://nominatim.openstreetmap.org/reverse?format=json&email=tech@creapp.us&lat='+lat+'&lon='+lon+'&json_callback=JSON_CALLBACK';
      $http.jsonp(url)
        .success(function(data){
          data.address.stateCode = getStateCode(data.address.state);
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
      registerMap : registerMap,
      getReverseGeoSearch: getReverseGeoSearch
    };

  })
