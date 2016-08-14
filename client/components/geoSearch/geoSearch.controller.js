angular.module('creapp3App')
.controller('geoInputPanelCtrl', geoInputPanelCtrl);

var geoInputPanelCtrl = function($scope, mdPanelRef, geosearchService, appConstants){
  this._mdPanelRef = mdPanelRef;
  this.geoinput = '';
  this.selectedState = 'CA';
  this.closePanel = function(){
    this._mdPanelRef.close();
  };
  var getLocation = function(){
    geosearchService.getLocation(this.geoinput + ', ' + this.selectedState + ' United States');
  };
  var getLocationBounded = getLocation.bind(this);

  this.geosearch = function(location){
    this._mdPanelRef.close()
    .finally(getLocationBounded);
  };

  this.states = appConstants.states.map(function(state){
    return state.iso;
  });
};

//   geoinput.oninput = function(){
//     console.log('this',this);
//     if (this.value === ', United States'){
//       this.value = '';
//     }
//     if (this.value.length===1) {
//       this.value = this.value + ', United States';
//       if (this.createTextRange) {
//         var part = this.createTextRange();
//         part.move("character", 1);
//         part.select();
//       } else if (this.setSelectionRange){
//         this.setSelectionRange(1, 1);
//       }
//         this.focus();
//     }
//   }
