'use strict';

angular.module('creapp3App')
.controller('geoInputPanelCtrl', geoInputPanelCtrl)
// .controller('drawCircleCtrl', geoDrawCircleCtrl);

var geoInputPanelCtrl = function($scope, mdPanelRef, geosearchService, mapService, appConstants){
  this._mdPanelRef = mdPanelRef;
  this.states = appConstants.states.map(function(state){
    return state.iso;
  });
  this.selectedState = 'CA';
  this.closePanel = function(){
    this._mdPanelRef.close();
  };
  this.searchLocation = function(){
    geosearchService.getLocationNominatim(this.geoinput + ', ' + this.selectedState + ' United States')
    .then(function(results){
      mapService.drawSearchResults(results);
    });
    this._mdPanelRef.close();
  };
};

// var geoDrawCircleCtrl = function($scope, mdPanelRef, geosearchService, appConstants){
//   this._mdPanelRef = mdPanelRef;
//   // this.geoinput
//   // this.radius
//   this.states = appConstants.states.map(function(state){
//     return state.iso;
//   });
//   this.selectedState = 'CA';
//
//   this.closePanel = function(){
//     this._mdPanelRef.close();
//   };
//
//   this.drawCircle = function(){
//     geosearchService.getLocationNominatim(this.geoinput + ', ' + this.selectedState + ' United States')
//     // geosearchService.getLocation('Palo Alto, California, United States')
//       .then(function(results){
//         geosearchService.mapDrawCircle(results, 1000);
//       });
//     this._mdPanelRef.close();
//   };
//
// };
