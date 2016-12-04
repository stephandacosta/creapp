'use strict';

// import { NONE, CREATE, EDIT, DELETE, APPEND, ALL, polygons } from 'FreeDraw';

angular.module('creapp3App')
  .factory('mapService', function ($rootScope, $location, $timeout, $state, freeDraw) {

   var map;
   var tilesLoaded =  false;
   var polygonsLayer, baseLayer, highlightedLayer;
   var searchBounds;
   var state;
   var editCircle;

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

    if ($location.absUrl().indexOf('localhost')===-1){
      L.Icon.Default.imagePath = 'bower_components/leaflet/dist/images';
    }

    // map settings
    var mapSettings = {
      tileUrl : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      initCenter: [37.4259332,-122.3413094]
    };


    $rootScope.$on('zoom:in', function(){
      map.zoomIn();
    });

    $rootScope.$on('zoom:out', function(){
      map.zoomOut();
    });


    var clearCircle = function(){
      if (!_.isUndefined(editCircle)){
        editCircle.remove();
      }
    };

    var drawCircle = function(center,radius, destroycallback){
      clearCircle();
      map.panTo(center);
      editCircle = L.circle(center, radius,{color:'rgba(0, 150, 136, 0.78)', fillColor: 'rgba(0, 150, 136, 0.78)'})
      .on('click',function(){
        map.removeLayer(this);
        destroycallback();
      })
      .addTo(map);
    };


    var drawSearchResults = function(obj){
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

    var clearLayers = function(){
      if (!_.isUndefined(polygonsLayer)){
        polygonsLayer.clearLayers();
      }
    };

    var addPolygonsLayer = function(){
      polygonsLayer = L.layerGroup().addTo(map);
    };

    var addBaseLayer = function(reqs){
      polygonsLayer.clearLayers();
      reqs.forEach(function(req){
        var base;
        if (req.polygon.length > 0){
          base = L.polygon(req.polygon);
        } else {
          base = L.circle(req.center,req.radius*1000/0.621371);
        }
        base.setStyle({color:'#00695C', fillColor: '#009688'})
        .on('click contextmenu', function() {
          $state.go('^.detail',{id: req._id });
        });
        baseLayer = polygonsLayer.addLayer(base);
      });
    };

    var addHighlightedLayer = function(req){
      if (highlightedLayer){
        polygonsLayer.removeLayer(highlightedLayer);
      }
      if (req.polygon.length > 0){
        highlightedLayer = L.polygon(req.polygon);
      } else {
        highlightedLayer = L.circle(req.center,req.radius*1000/0.621371);
      }
      polygonsLayer.addLayer(highlightedLayer.setStyle({color:'#E040FB', fillColor: '#E040FB'}));
    };

    var removeHighlightedLayer = function(){
      polygonsLayer.removeLayer(highlightedLayer);
    };

    var addFreeDrawLayer = function(req){
      map.panTo(req.center);
      if (req.polygon.length > 0){
        var latLngs = [];
        req.polygon.forEach(function(point){
          latLngs.push(L.latLng(point[0], point[1]));
        });
        freeDraw.create(latLngs);
      }
    };

    // *** problem here when starting the app from detail state
    // need to timeout to work (tried using tileload event but does not work)
    var fitToReq = function(req){
      console.log('fitting to req');
      state = 'req';
      map.whenReady(function(){
        addHighlightedLayer(req);
        $timeout(function(){
          map.fitBounds(highlightedLayer.getBounds());
        },200);
      });
    };

    var resetBounds = function(){
      state = 'search';
      if (!_.isUndefined(searchBounds)){
        map.fitBounds(searchBounds);
        // map.flyToBounds(searchBounds);
      } else if (!_.isUndefined(map)) {
        map.zoomOut();
      }
    };

    // var contained = function(container,containee){
    //   var sw=0, ne=1, x = 0, y = 1;
    //   return (container[sw][x] <= containee[sw][x]) &&
    //   (container[sw][y] <= containee[sw][y]) &&
    //   (container[ne][x] >= containee[ne][x]) &&
    //   (container[ne][y] >= containee[ne][y]);
    // };

    var updateSearchBounds = function() {
      if (state === 'search') {
        console.log('updating bounds');
        var bounds = map.getBounds();
        var boundsArray = [
          [bounds._southWest.lat, bounds._southWest.lng],
          [bounds._northEast.lat, bounds._northEast.lng]
        ];
        searchBounds =  boundsArray.slice();
      }
    };


    return {
      addMaptoElement : function(element){
        //create map
        console.log('creating map');
        map = new L.Map(element, {zoomControl:false}).setView(mapSettings.initCenter, 10);
        L.tileLayer(mapSettings.tileUrl, {
          attribution: mapSettings.attribution
        }).on('load', function(){ tilesLoaded = true;}).addTo(map);
        state = 'search';
        map.on('load moveend', updateSearchBounds);
      },
      addDetailMap : function(element, req){
        //create map
        console.log('creating detail map');
        map = new L.Map(element, {zoomControl:false});
        L.tileLayer(mapSettings.tileUrl, {
          attribution: mapSettings.attribution
        }).on('load', function(){ tilesLoaded = true;}).addTo(map);
        state = 'req';
        if (req.polygon.length > 0){
          highlightedLayer = L.polygon(req.polygon);
        } else {
          highlightedLayer = L.circle(req.center,req.radius*1000/0.621371);
        }
        highlightedLayer.setStyle({color:'#E040FB', fillColor: '#E040FB'}).addTo(map);
      },
      addFreeDraw : function(){
        freeDraw.addToMap(map);
      },
      clearLayers : clearLayers,
      addPolygonsLayer : addPolygonsLayer,
      addBaseLayer : addBaseLayer,
      addHighlightedLayer : addHighlightedLayer,
      removeHighlightedLayer : removeHighlightedLayer,
      addFreeDrawLayer: addFreeDrawLayer,
      fitToReq: fitToReq,
      resetBounds: resetBounds,
      getSearchBounds: function(){
        return searchBounds;
      },
      invalidateSize: function(){
        map.invalidateSize();
      },
      drawCircle: drawCircle,
      clearCircle: clearCircle,
      drawSearchResults: drawSearchResults
    };

  });
