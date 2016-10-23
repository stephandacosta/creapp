'use strict';

angular.module('creapp3App')
  .directive('reqForm', function (appConstants, $http, $state, $mdToast, $mdMedia, $timeout, geosearchService) {
    return {
      templateUrl: 'app/req/reqForm/reqForm.html',
      restrict: 'AE',
      scope: {
        req: '=req',
        openedEditForm: '=openedEditForm'
      },
      link: function(scope){

        scope.types = appConstants.creTypes;

        scope.$watch('landandprop',function(newValue){
          console.log(newValue);
          if (newValue === 'landOnly') {
            scope.req.landOnly = true;
            scope.req.landWithProperty = false;
          } else {
            scope.req.landOnly = false;
            scope.req.landWithProperty = true;
          }
        });

        scope.toggleEditForm = function(){
          scope.openedEditForm=!scope.openedEditForm;
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
        scope.cancel = function(){
          showToast('No changes were made');
          $state.go('myreqs.list');
        };

        // post the req
        scope.addReq = function(){
          // other properties such as user, date creation are added server side
          // post req to server then drop toast
          $http.post('/api/buyreqs', scope.req).then(function(){
            showToast('Your requirement was saved !');
            scope.req = _.cloneDeep(appConstants.emptyReq);
            $state.go('myreqs.list');
          }, function(){
            showToast('There was an issue in saving your requisition');
          });
        };

        // save req changes
        scope.saveEdit = function(){
          // put req to server then drop toast
          var api = '/api/buyreqs/';
          // code if different end point for admin
          // currently admin check performed server side
          // $user.currentUser.groups.items.forEach(function(group){
          //   if (group.name=='admins'){
          //     api = '/api/buyreqs/admin/';
          //   }
          // });
          $http.put(api + scope.req._id, scope.req).then(function(){
            showToast('Your requirement edits were saved !');
            scope.req = _.cloneDeep(appConstants.emptyReq);
            $state.go('myreqs.list');
          }, function(){
            // showToast('There was an issue in saving your edits');
          });
        };

        scope.deleteReq = function(){
          $http.delete('/api/buyreqs/' + scope.req._id).then(function(){
            showToast('Your requirement was deleted !');
            scope.req = _.cloneDeep(appConstants.emptyReq);
            $state.go('myreqs.list');
          }, function(){
            showToast('There was an issue deleting your requisition');
          });
        };

        scope.scrollDown = function(){
          $timeout(function() {
           document.getElementById('sidenav').scrollTop = document.getElementById('sidenav').scrollHeight;
         },100);
        }

        scope.updateLocation = function(){
          var firstBounds = L.polygon(scope.req.polygons[0]).getBounds();
          var firstCenter = firstBounds.getCenter();
          scope.req.radius = Math.round(firstCenter.distanceTo(firstBounds.getNorthEast())/1000*0.621371*10)/10;
          geosearchService.getReverseGeoSearch(firstCenter.lat, firstCenter.lng, function(results){
            scope.req.town = results.address.town;
            scope.req.city = results.address.city;
            scope.req.country_code = results.address.country_code.toUpperCase();
            scope.req.county = results.address.county;
            scope.req.postcode = results.address.postcode;
            scope.req.road = results.address.road;
            scope.req.state = results.address.state;
            console.log(scope.req);
            // scope.$apply();
          });
        };

      }
    };
  });
