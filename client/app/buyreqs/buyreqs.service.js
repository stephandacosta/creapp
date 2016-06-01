'use strict';

angular.module('creapp3App')
  .factory('buyreqs', function ($rootScope, $http) {

    var buyreqs = [];
    var bounds = [];
    var selectedReq = {};
    var url;

    var updateBuyReqs = function(search){

      if (bounds.length === 0){ return;}
      // update mongo query object map bounds
      var query = {};
      query.centers = {
        $geoWithin: {
          $box: [
            bounds[0],
            bounds[1]
          ]
        }
      };

      $http.get(url, {params: { query }}).then(response => {
        // update buyreqs list
        buyreqs = response.data;
        // prefix type to the title
        buyreqs.forEach(function(buyreq){
          var tmp = buyreq.buy ? 'To Buy' : '';
          tmp = (buyreq.exchange ? (tmp==='' ? 'To Exchange' : tmp + '/Exchange') : tmp );
          tmp = (buyreq.lease ? (tmp==='' ? 'To Lease' : tmp + '/Lease') : tmp );
          buyreq.transactionTitle = tmp;
        });

        $rootScope.$broadcast('buyreqs:update');

        // to log for seeding
        // $scope.buyreqs.forEach(function(req){
        //   req.centers = req.polygons.map(function(polygon){
        //     var center = L.polygon(polygon).getBounds().getCenter();
        //     return [center.lat, center.lng];
        //   });
        // });
        // console.log($scope.buyreqs);
      });
    };

    var updateBroker = function(selectedReq){
      if (selectedReq && selectedReq.user){
        $http.get('/api/users/' + selectedReq.user).then(response => {
          selectedReq.broker = response.data;
        })
        .catch(err => {console.log(err);});
      }
    };


    var updateSelectedReq = function(id){
      if (!id){
        selectedReq = {};
      } else {
        selectedReq = _.find(buyreqs, { '_id': id });
        if (selectedReq) {
          $rootScope.$broadcast('selectedReq:update');
          updateBroker(selectedReq);
        } else {
          $http.get('/api/buyreqs/'+ id).then(response => {
            selectedReq = response.data;
            $rootScope.$broadcast('selectedReq:update');
            updateBroker(selectedReq);
          });
        }
      }
    };

    var updateBounds = function(boundsArray){
      bounds = boundsArray;
      updateBuyReqs();
    };

    var updateUrl = function(newUrl){
      url = newUrl;
      // updateBuyReqs();
    };

    return {
      updateBuyReqs: updateBuyReqs,
      getBuyReqs: function(){return buyreqs;},
      updateBounds: updateBounds,
      getBounds: function(){return bounds;},
      updateSelectedReq: updateSelectedReq,
      getSelectedReq: function(){return selectedReq || {} ;},
      updateUrl: function(newUrl){url=newUrl;}
      // updateSelf: function(newSelf){self=newSelf;}
    };
  });
