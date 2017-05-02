'use strict';

angular.module('creapp')
  .controller('reqCtrl', function ( appConstants, $scope, req, $mdMedia, $timeout, $rootScope, $http, $state, $mdToast, geosearchService, fieldValidation, mapService, freeDraw) {

    // main will be shared in child scopes
    $scope.main = {};

    // req holds the new or existing req being added/edited
    $scope.main.req = req;
    // $scope.main.req = _.cloneDeep(appConstants.emptyReq);


    // toggle map on mobile
    $scope.showMap = false;
    $scope.mapLeftPosition = '100vw';
    $scope.toggleMap = function(){
        $scope.showMap = !$scope.showMap;
        $scope.mapLeftPosition = '0';
        if ($scope.showMap){
          $scope.mapLeftPosition = '0';
          $timeout(function(){mapService.invalidateSize(); },100);
        } else {
          $scope.mapLeftPosition = '100vw';
        }

    };


    $scope.types = appConstants.creTypes;

    if (!$scope.main.req.type) {$scope.main.req.type =  'Any';}

    $scope.$watch('landandprop',function(newValue){
      if (newValue === 'landOnly') {
        $scope.main.req.landOnly = true;
        $scope.main.req.landWithProperty = false;
      } else {
        $scope.main.req.landOnly = false;
        $scope.main.req.landWithProperty = true;
      }
    });


    $scope.validate = function(value, fieldtype){
      if (fieldtype==='stateCode'){
        var stateCode = fieldValidation.validate(value, 'stateCode');
        console.log(stateCode);
        $scope.main.req.state = fieldValidation.getStateName(stateCode);
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
      if ($scope.main.req._id){
        $state.go('buyreqs.details.views', {id: $scope.main.req._id});
      } else {
        $state.go('buyreqs.browse.views');
      }
    };

    $scope.formErrors = {
      area: false,
      buytype: false
    };
    // check req has center  and area
    $scope.checkReqArea = function(req){
      var req = req || $scope.main.req;
      if (req.center &&
        req.center.length===2 &&
        req.radius > 0){
          $scope.formErrors.area = false;
      } else {
        $scope.formErrors.area = true;
      }
      return !$scope.formErrors.area;
    };

    // check req has buy type
    $scope.checkReqBuyType = function(req){
      var req = req || $scope.main.req;
      if (req.buy || req.exchange || req.lease){
        $scope.formErrors.buytype = false;
      } else {
        $scope.formErrors.buytype = true;
      }
      return !$scope.formErrors.buytype;
    };

    var checkReqSubmit = function(req){
      var req = req || $scope.main.req;
      $scope.checkReqArea(req);
      $scope.checkReqBuyType(req);
    }



    // post the req
    $scope.addReq = function(){
      // other properties such as user, date creation are added server side
      // post req to server then drop toast
      checkReqSubmit($scope.main.req)
      if (!$scope.formErrors.area && !$scope.formErrors.buytype){
        $http.post('/api/buyreqs', $scope.main.req).then(function(response){
          console.log(response);
          showToast('Your requirement was saved !');
          $state.go('buyreqs.details.views', {id: response.data._id});
        }, function(){
          showToast('There was an issue in saving your requisition');
        });
      } else {
        showToast('There was an issue in saving your requisition');
      }
    };

    // save req changes
    $scope.saveEdit = function(){
      // put req to server then drop toast
      var api = '/api/buyreqs/';
      console.log('saving', $scope.main.req);
      if ($scope.checkReqArea($scope.main.req) && $scope.checkReqBuyType($scope.main.req)){
        $http.put(api + $scope.main.req._id, $scope.main.req).then(function(){
          showToast('Your requirement edits were saved !');
          $state.go('buyreqs.details.views', {id: $scope.main.req._id});
        }, function(){
          showToast('There was an issue in saving your edits');
        });
      } else {
        showToast('There was an issue in saving your edits');
      }
    };

    $scope.deleteReq = function(){
      $http.delete('/api/buyreqs/' + $scope.main.req._id).then(function(){
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
        $scope.main.req.town = results.address.town;
        $scope.main.req.city = results.address.city;
        $scope.main.req.country_code = results.address.country_code.toUpperCase();
        $scope.main.req.county = results.address.county;
        $scope.main.req.postcode = results.address.postcode;
        $scope.main.req.road = results.address.road;
        $scope.main.req.state = results.address.stateCode;
      });
    };

    $scope.updateLocation = function(){
      var bounds = L.polygon($scope.main.req.polygon).getBounds();
      var center = bounds.getCenter();
      $scope.main.req.radius = Math.round(center.distanceTo(bounds.getNorthEast())/1000*0.621371*10)/10;
      reverseGeoCode(center.lat, center.lng);
    };

    var setLocationDetails = function(lat,lon){
      geosearchService.getReverseGeoSearch(lat, lon, function(results){
        $scope.main.req.town = results.address.town;
        $scope.main.req.city = results.address.city;
        $scope.main.req.country_code = results.address.country_code.toUpperCase();
        $scope.main.req.county = results.address.county;
        $scope.main.req.postcode = results.address.postcode;
        $scope.main.req.road = results.address.road;
        $scope.main.req.state = results.address.stateCode;
        // console.log($scope.main.req);
        // $scope.$apply();
      });
    };

    var resetLocationDetails = function(){
      console.log('delete');
      delete $scope.main.req.radius;
      delete $scope.main.req.town;
      delete $scope.main.req.city;
      delete $scope.main.req.country_code;
      delete $scope.main.req.county;
      delete $scope.main.req.postcode;
      delete $scope.main.req.road;
      delete $scope.main.req.state;
      $scope.checkReqArea($scope.main.req);
      $scope.$apply();
    };

    freeDraw.listen('area',function(area){
      if ( _.isUndefined(area) || _.isUndefined(area.center) || area.center.length === 0) {
        resetLocationDetails();
      } else {
        $scope.main.req.center = area.center;
        $scope.main.req.radius = area.radius;
        $scope.main.req.polygon = area.polygon;
        setLocationDetails(area.center[0], area.center[1]);
      }
      $scope.checkReqArea($scope.main.req);
    });


    freeDraw.listen('mode',function(mode){
      $scope.drawmode = mode;
      if (mode==='all'){
        mapService.clearCircle();
      }
      if (mode==='all' && $scope.main.req.center.length>0){
        freeDraw.clear();
      }
    });

    $scope.setMode = function(mode){
      freeDraw.setMode(mode);
    };


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
          $scope.main.req.center = results.point;
          $scope.main.req.radius = $scope.circleDraw.radius;
          $scope.main.req.road = results.address.addressLine;
          $scope.main.req.formattedAddress = results.address.formattedAddress;
          $scope.main.req.neighborhood = results.address.neighborhood;
          $scope.main.req.town = results.address.locality;
          $scope.main.req.postcode = results.address.postcode;
          $scope.main.req.landmark  = results.address.landmark;
          $scope.main.req.state = $scope.circleDraw.selectedState;
          $scope.checkReqArea($scope.main.req);
        });
    };


  });
