'use strict';

angular.module('creapp')
  .controller('geoInputPanelCtrl', function($scope, mdPanelRef, geosearchService, mapService, appConstants){
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
  });
// 
// var geoInputPanelCtrl = function($scope, mdPanelRef, geosearchService, mapService, appConstants){
//   this._mdPanelRef = mdPanelRef;
//   this.states = appConstants.states.map(function(state){
//     return state.iso;
//   });
//   this.selectedState = 'CA';
//   this.closePanel = function(){
//     this._mdPanelRef.close();
//   };
//   this.searchLocation = function(){
//     geosearchService.getLocationNominatim(this.geoinput + ', ' + this.selectedState + ' United States')
//     .then(function(results){
//       mapService.drawSearchResults(results);
//     });
//     this._mdPanelRef.close();
//   };
// };
