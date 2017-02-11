'use strict';

angular.module('creapp')
  .directive('reqForm', function ($rootScope, appConstants, $http, $state, $mdToast, $mdMedia, $timeout, geosearchService, fieldValidation, mapService, freeDraw) {
    return {
      templateUrl: 'app/req/reqForm/reqForm.html',
      restrict: 'AE',
      scope: {
        req: '=req',
        openedEditForm: '=openedEditForm'
      },
      controller: function($scope){

        $scope.types = appConstants.creTypes;

        $scope.$watch('landandprop',function(newValue){
          if (newValue === 'landOnly') {
            $scope.req.landOnly = true;
            $scope.req.landWithProperty = false;
          } else {
            $scope.req.landOnly = false;
            $scope.req.landWithProperty = true;
          }
        });

        $scope.toggleEditForm = function(){
          $scope.openedEditForm=!$scope.openedEditForm;
        };

        $scope.validate = function(value, fieldtype){
          if (fieldtype==='stateCode'){
            var stateCode = fieldValidation.validate(value, 'stateCode');
            console.log(stateCode);
            $scope.req.state = fieldValidation.getStateName(stateCode);
            return stateCode;
          }
          return fieldValidation.validate(value, fieldtype);
        };

        var showToast = function(msg){
          $mdToast.show(
            $mdToast.simple()
            .textContent(msg)
            .position('top left')
            .parent(document.getElementById('toasts'))
            .hideDelay(3000)
          );
        };

        // clear all for button click
        $scope.cancel = function(){
          showToast('No changes were made');
          if ($scope.req._id){
            $state.go('buyreqs.details.views', {id: $scope.req._id});
          } else {
            $state.go('buyreqs.browse.views');
          }
        };

        // post the req
        $scope.addReq = function(){
          // other properties such as user, date creation are added server side
          // post req to server then drop toast
          console.log('adding', $scope.req);
          $http.post('/api/buyreqs', $scope.req).then(function(){
            showToast('Your requirement was saved !');
            $state.go('buyreqs.details.views', {id: $scope.req._id});
          }, function(){
            showToast('There was an issue in saving your requisition');
          });
        };

        // save req changes
        $scope.saveEdit = function(){
          // put req to server then drop toast
          var api = '/api/buyreqs/';
          console.log('saving', $scope.req);
          $http.put(api + $scope.req._id, $scope.req).then(function(){
            showToast('Your requirement edits were saved !');
            $state.go('buyreqs.details.views', {id: $scope.req._id});
          }, function(){
            showToast('There was an issue in saving your edits');
          });
        };

        $scope.deleteReq = function(){
          $http.delete('/api/buyreqs/' + $scope.req._id).then(function(){
            showToast('Your requirement was deleted !');
            $state.go('buyreqs.browse.views');
          }, function(){
            showToast('There was an issue deleting your requisition');
          });
        };

        $scope.scrollDown = function(){
          $timeout(function() {
           document.getElementById('sidenav').scrollTop = document.getElementById('sidenav').scrollHeight;
         },100);
        };

        var reverseGeoCode = function(lat,lng){
          geosearchService.getReverseGeoSearch(lat,lng, function(results){
            $scope.req.town = results.address.town;
            $scope.req.city = results.address.city;
            $scope.req.country_code = results.address.country_code.toUpperCase();
            $scope.req.county = results.address.county;
            $scope.req.postcode = results.address.postcode;
            $scope.req.road = results.address.road;
            $scope.req.state = results.address.stateCode;
          });
        };

        $scope.updateLocation = function(){
          var bounds = L.polygon($scope.req.polygon).getBounds();
          var center = bounds.getCenter();
          $scope.req.radius = Math.round(center.distanceTo(bounds.getNorthEast())/1000*0.621371*10)/10;
          reverseGeoCode(center.lat, center.lng);
        };

        var setLocationDetails = function(lat,lon){
          geosearchService.getReverseGeoSearch(lat, lon, function(results){
            $scope.req.town = results.address.town;
            $scope.req.city = results.address.city;
            $scope.req.country_code = results.address.country_code.toUpperCase();
            $scope.req.county = results.address.county;
            $scope.req.postcode = results.address.postcode;
            $scope.req.road = results.address.road;
            $scope.req.state = results.address.stateCode;
            // console.log($scope.req);
            // $scope.$apply();
          });
        };

        var resetLocationDetails = function(){
          console.log('delete');
          delete $scope.req.radius;
          delete $scope.req.town;
          delete $scope.req.city;
          delete $scope.req.country_code;
          delete $scope.req.county;
          delete $scope.req.postcode;
          delete $scope.req.road;
          delete $scope.req.state;
          $scope.$apply();
        };

        freeDraw.listen('area',function(area){
          if ( _.isUndefined(area) || _.isUndefined(area.center) || area.center.length === 0) {
            resetLocationDetails();
          } else {
            $scope.req.center = area.center;
            $scope.req.radius = area.radius;
            $scope.req.polygon = area.polygon;
            setLocationDetails(area.center[0], area.center[1]);
          }
        });


        freeDraw.listen('mode',function(mode){
          $scope.drawmode = mode;
          if (mode==='all'){
            mapService.clearCircle();
          }
          if (mode==='all' && $scope.req.center.length>0){
            freeDraw.clear();
          }
        });

        $scope.setMode = function(mode){

          freeDraw.setMode(mode);
        };

        $scope.$watch('input.type', function(){
          freeDraw.setMode('edit');
        });

        $scope.circleDraw = {};
        $scope.circleDraw.states = appConstants.states.map(function(state){
          return state.iso;
        });
        $scope.circleDraw.selectedState = 'CA';
        // $scope.circleDraw.geoinput='';
        $scope.circleDraw.radius=2;
        $scope.circleDraw.drawCircle = function(){
          console.log($scope.circleDraw.geoinput + ', ' + $scope.circleDraw.selectedState + ' United States');
          geosearchService.getLocationBing($scope.circleDraw.geoinput + ', ' + $scope.circleDraw.selectedState + ' United States')
          // geosearchService.getLocation('Palo Alto, California, United States')
            .then(function(results){
              var radiusMeters = $scope.circleDraw.radius*1000/0.621371;
              mapService.clearLayers();
              freeDraw.clear();
              mapService.drawCircle(results.point, radiusMeters, function(){
                resetLocationDetails();
              });
              $scope.req.center = results.point;
              $scope.req.radius = $scope.circleDraw.radius;
              $scope.req.road = results.address.addressLine;
              $scope.req.formattedAddress = results.address.formattedAddress;
              $scope.req.neighborhood = results.address.neighborhood;
              $scope.req.town = results.address.locality;
              $scope.req.postcode = results.address.postcode;
              $scope.req.landmark  = results.address.landmark;
              $scope.req.state = $scope.circleDraw.selectedState;
            });
        };


        // // on edit mode set predefined polygons
        // if (currentState === 'req.edit' &&  $scope.req) {
        //   $timeout(function(){
        //     if (!_.isUndefined($scope.req.polygon) && $scope.req.polygon.length>0){
        //       console.log('should add free draw layer');
        //       mapService.addFreeDrawLayer($scope.req);
        //     } else if ($scope.req.radius>0){
        //       console.log('should add circle');
        //       var radiusMeters = $scope.req.radius*1000/0.621371;
        //       mapService.drawCircle($scope.req.center, radiusMeters, function(){
        //         resetLocationDetails();
        //       });
        //     }
        //   }, 1000);
        // }


      }
    };
  });
