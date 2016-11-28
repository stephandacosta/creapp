'use strict';

angular.module('creapp3App')
  .factory('geosearchService', function ($rootScope, $http, $q, $mdPanel, $mdMedia, appConstants) {

    var map;

    // var myIcon = L.icon({
    // iconUrl: '../../assets/images/mapIcon.png',
    // iconRetinaUrl: 'my-icon@2x.png',
    // iconSize: [38, 95],
    // iconAnchor: [22, 94],
    // popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    // shadowRetinaUrl: 'my-icon-shadow@2x.png',
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
    // });

    var mapDrawCircle = function(obj,radius){
      console.log('obj',obj, ' radius ', radius);
      map.panTo(obj.point);
      L.circle(obj.point, radius,{color:'rgba(0, 150, 136, 0.78)', fillColor: 'rgba(0, 150, 136, 0.78)'}).addTo(map);
    };

    var mapDrawSearchResults = function(obj){
      map.panTo(obj.point);
      // map.fitBounds(obj.bbox);
      // searchLayer.addLayer(L.polygon(latlngs, {className:'searchresult'})
      // .setStyle({color:'rgba(0, 150, 136, 0.78)', fillColor: 'rgba(0, 150, 136, 0.78)'}));
      // .on('click', function(e) {
      //   searchLayer.clearLayers();
      //  });
      // .on('click contextmenu', function(e) {
      //   $state.go('^.detail',{id: req._id });
      // }));
      // map.fitBounds( obj[0].boundingbox<LatLngBounds> bounds, <fitBounds options> options? )
      // L.marker(obj.point, {icon: myIcon}).bindPopup('<div>marker popoup</div>').openPopup().addTo(map);
      L.marker(obj.point).bindPopup('<div>marker popoup</div>').openPopup().addTo(map);
      // marker.bindPopup(popupContent).openPopup();
    };


    var getLocationNominatim = function(query){

      var deferred = $q.defer();
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
            deferred.resolve(parsedResults);
          } else {
            deferred.reject('no result');
          }
        })
        .error(function(error){
          console.log(error);
          deferred.reject(error);
          // errorcallback(error);
        });
      return deferred.promise;
    };


    var getLocationBing = function(query){
      var deferred = $q.defer();
      var encodedQuery = encodeURIComponent(query);
      var url = 'https'+'://dev.virtualearth.net/REST/v1/Locations?q='+encodedQuery+'&include=ciso2&include=neighborhood&o=json&jsonp=JSON_CALLBACK&key=AkQXcyq56oIk_a0AzgsOgRCdHNQThZNISRSWCaQMTM9ujyJdcCo2H8xjzlBxC-Ln';
      // console.log('sending');
      $http.jsonp(url)
        .success(function(data){
            var parsedResults = {
              point : data.resourceSets[0].resources[0].geocodePoints[0].coordinates,
              bbox : [
                [data.resourceSets[0].resources[0].bbox[0],data.resourceSets[0].resources[0].bbox[1]],
                [data.resourceSets[0].resources[0].bbox[2],data.resourceSets[0].resources[0].bbox[3]]
              ],
              address : {
                formattedAddress : data.resourceSets[0].resources[0].address.formattedAddress || '',
                state : data.resourceSets[0].resources[0].address.adminDistrict || '',
                country : data.resourceSets[0].resources[0].address.countryRegionIso2 || '',
                addressLine : data.resourceSets[0].resources[0].address.addressLine || '',
                neighborhood : data.resourceSets[0].resources[0].address.neighborhood || '',
                locality : data.resourceSets[0].resources[0].address.locality || '',
                city : data.resourceSets[0].resources[0].address.adminDistrict2 || '',
                postcode : data.resourceSets[0].resources[0].address.postalCode || '',
                landmark : data.resourceSets[0].resources[0].address.landmark || ''
              },
              type: data.resourceSets[0].resources[0].entityType || ''
            };
          deferred.resolve(parsedResults);
        })
        .error(function(error){
          console.log(error);
          deferred.reject(error);
        });
      return deferred.promise;
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
    };


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

    var showPanel = function (type) {

      var geoSearchPanels = {
        drawCircle: {
          template: 'drawCircle.html',
          controller: geoDrawCircleCtrl
        },
        geoSearch: {
          template: 'geoSearch.html',
          controller: geoInputPanelCtrl
        }
      };

      var panelPosition = $mdPanel.newPanelPosition()
        .absolute()
        .left((window.innerWidth/2 - 150) + 'px')
        .top((window.innerHeight/2 - 150) + 'px');

      var config = {
        controller: geoSearchPanels[type].controller,
        controllerAs: 'geoInputCtrl',
        // locals : tooltipList[index],
        position: panelPosition,
        zIndex: 1000,
        panelClass : 'geoInput',
        templateUrl: 'components/geoSearch/' + geoSearchPanels[type].template,
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
      getLocationBing: getLocationBing,
      getLocationNominatim: getLocationNominatim,
      geoSearchInput : function(){
        showPanel('geoSearch');
      },
      drawCircleInput: function(){
        showPanel('drawCircle');
      },
      registerMap : function(mapinput){
        map=mapinput;
        console.log('registering map');
      },
      getReverseGeoSearch: getReverseGeoSearch,
      mapDrawSearchResults: mapDrawSearchResults,
      mapDrawCircle: mapDrawCircle
    };

  });
