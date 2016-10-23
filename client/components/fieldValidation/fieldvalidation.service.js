'use strict';

angular.module('creapp3App')
  .factory('fieldValidation', function (appConstants) {

    var validate = function(value, field){
      console.log('validating', value, field);
      if (value===''){
        console.log('empty');
        return ' ';
      }
      if (field==='stateCode'){
        var state = appConstants.states.filter(function(obj){
          return obj.iso === value.toUpperCase();
        });
        if (state.length){
          return value;
        } else {
          return '';
        }
      }
      console.log('returning value');
      return value;
    };

    var getStateName = function(stateCode){
      var stateName = appConstants.states.filter(function(obj){
        return obj.iso === stateCode.toUpperCase();
      });
      if (stateName.length){
        return stateName[0].name;
      } else {
        return 'unknown';
      }
    }


    return {
      validate: validate,
      getStateName: getStateName
    };

  })
