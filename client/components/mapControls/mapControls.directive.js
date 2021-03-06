'use strict';

angular.module('creapp')
  .directive('mapControls', function ($rootScope, $state, geosearchService) {
    return {
      templateUrl: 'components/mapControls/mapControls.html',
      restrict: 'E',
      link: function(scope){

        scope.state=$state.current.name;

        scope.geoSearch = function(){
          geosearchService.geoSearchInput();
        };

        // scope.toggleEditForm = function(){
        //   scope.main.openedEditForm=!scope.main.openedEditForm;
        // };

        scope.zoomIn = function(){
          $rootScope.$broadcast('zoom:in');
        };
        scope.zoomOut = function(){
          $rootScope.$broadcast('zoom:out');
        };

        // scope.setMode = function(mode){
        //   $rootScope.$broadcast('manualmode:' + mode);
        // };



      }
    };
  });
