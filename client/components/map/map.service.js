'use strict';

// import { NONE, CREATE, EDIT, DELETE, APPEND, ALL, polygons } from 'FreeDraw';

angular.module('creapp3App')
  .factory('mapService', function ($rootScope, $location, $timeout, $state, freeDraw, mapBoundsService) {

   var map;
   var polygonsLayer, baseLayer, highlightedLayer, markerGroup;
  //  var searchBounds;
   var state;
   var editCircle;

   var init = false;

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
      initCenter: [40.48038142908172,-97.03125],
      initZoom: 7
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
      polygonsLayer = L.featureGroup();
      polygonsLayer.addTo(map);

      map.zoomOut(3);
      markerGroup = L.markerClusterGroup({singleMarkerMode:true});
      map.addLayer(markerGroup);

    };

    var addBaseLayer = function(reqs){
      polygonsLayer.clearLayers();
      markerGroup.clearLayers();
      if(reqs){
        reqs.forEach(function(req){
          var base;
          if (req.polygon.length > 0){
            base = L.polygon(req.polygon);
          } else {
            base = L.circle(req.center,req.radius*1000/0.621371);
          }
          base.setStyle({color:'#00695C', fillColor: '#009688'})
          .on('click contextmenu', function() {
            $state.go('buyreqs.details.views',{id: req._id });
          });
          polygonsLayer.addLayer(base);
          markerGroup.addLayer(L.marker(req.center)
          .on('click contextmenu', function() {
            $state.go('buyreqs.details.views',{id: req._id });
          }));
        });
      }
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
      state = 'req';
      map.whenReady(function(){
        addHighlightedLayer(req);
        $timeout(function(){
          map.fitBounds(highlightedLayer.getBounds());
        },200);
      });
    };

    // var resetBounds = function(){
    //   state = 'search';
    //   if (!_.isUndefined(searchBounds)){
    //     map.fitBounds(searchBounds);
    //     // map.flyToBounds(searchBounds);
    //   } else if (!_.isUndefined(map)) {
    //     map.zoomOut();
    //   }
    // };


    // var contained = function(container,containee){
    //   var sw=0, ne=1, x = 0, y = 1;
    //   return (container[sw][x] <= containee[sw][x]) &&
    //   (container[sw][y] <= containee[sw][y]) &&
    //   (container[ne][x] >= containee[ne][x]) &&
    //   (container[ne][y] >= containee[ne][y]);
    // };

    var resetBounds = function(){
      map.whenReady(function(){
        if (init && ($state.current.name === 'buyreqs.browse.views' || $state.current.name === 'req.add')){
          init = false;
          var listBounds = mapBoundsService.getListBounds();
          if (_.isArray(listBounds) && listBounds.length > 0){
            $timeout(function(){
              map.fitBounds(listBounds);
            },200);
          }
        }
      });
    };

    var updateListBounds = function() {
      if (!init && ($state.current.name === 'buyreqs.browse.views' || $state.current.name === 'req.add')) {
        var bounds = map.getBounds();
        var boundsArray = [
          [bounds._southWest.lat, bounds._southWest.lng],
          [bounds._northEast.lat, bounds._northEast.lng]
        ];
        mapBoundsService.updateListBounds(boundsArray.slice());
      }
    };



    return {
      addMaptoElement : function(element){
        //create map
        map = new L.Map(element, {zoomControl:false}).setView(mapSettings.initCenter,mapSettings.initZoom);
        L.tileLayer(mapSettings.tileUrl, {
          attribution: mapSettings.attribution
        }).addTo(map);
        init=true;
        map.on('load moveend', updateListBounds);
      },
      // addDetailMap : function(element, req){
      //   //create map
      //   console.log('creating detail map');
      //   map = new L.Map(element, {zoomControl:false});
      //   L.tileLayer(mapSettings.tileUrl, {
      //     attribution: mapSettings.attribution
      //   }).on('load', function(){ tilesLoaded = true;}).addTo(map);
      //   state = 'req';
      //   if (req.polygon.length > 0){
      //     highlightedLayer = L.polygon(req.polygon);
      //   } else {
      //     highlightedLayer = L.circle(req.center,req.radius*1000/0.621371);
      //   }
      //   highlightedLayer.setStyle({color:'#E040FB', fillColor: '#E040FB'}).addTo(map);
      // },
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
      panTo: function(center){
        map.panTo(center);
        map.setZoom(11);
      },
      resetBounds: resetBounds,
      // getSearchBounds: function(){
      //   return searchBounds;
      // },
      invalidateSize: function(){
        map.invalidateSize();
      },
      drawCircle: drawCircle,
      clearCircle: clearCircle,
      drawSearchResults: drawSearchResults
    };

  });
