'use strict';

// import { NONE, CREATE, EDIT, DELETE, APPEND, ALL, polygons } from 'FreeDraw';

angular.module('creapp')
  .factory('freeDraw', function () {

    var area = {};
    var emitArea, emitMode;

    //create freedraw object
    var freeDraw = new window.FreeDraw.freeDraw();
    freeDraw.options.mode = window.FreeDraw.ALL;

    var setMode = function (mode) {
      // console.log('mode',mode);
      var modemap={
        edit: (window.FreeDraw.EDIT | window.FreeDraw.DELETE),
        all: window.FreeDraw.ALL
      };
      freeDraw.mode(modemap[mode]);
    };

    freeDraw.on('mode', function modeReceived(eventData) {
      // console.log('mode change', eventData);
      if (_.isFunction(emitMode)){
        if (eventData.mode === 6){
          emitMode('edit');
        }
        if (eventData.mode === 15){
          emitMode('all');
        }
      }
    });

    // when there is a new polygon, add it to scope
    // this fires on zoom as well
    freeDraw.on('markers', function getMarkers(eventData) {
      setMode('edit');
      if (eventData.latLngs.length) {
        var polygon = eventData.latLngs[eventData.latLngs.length-1];
        area.polygon = polygon.map(function(point){
          return [point.lat, point.lng];
        });
        var center = L.polygon(polygon).getBounds().getCenter();
        area.center = [center.lat, center.lng];
        var bounds = L.polygon(area.polygon).getBounds();
        area.radius = Math.round(center.distanceTo(bounds.getNorthEast())/1000*0.621371*10)/10;
      } else {
        area = {};
      }
      emitArea(area);
    });

    var create = function(latLngs){
      freeDraw.create(latLngs);
    };

    var clear = function(){
      freeDraw.clear();
    };



    return {
      // freeDraw: freeDraw,
      addToMap: function(map){
        map.addLayer(freeDraw);
      },
      setMode: setMode,
      listen: function(event, callback){
        if (event==='area'){
          emitArea = function(area){
            callback(area);
          };
        }
        if (event==='mode'){
          emitMode = function(mode){
            callback(mode);
          };
        }
      },
      create: create,
      clear: clear
    };

  });
