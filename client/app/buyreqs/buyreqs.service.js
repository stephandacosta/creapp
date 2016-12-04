'use strict';

angular.module('creapp3App')
  .factory('buyreqs', function ($rootScope, $http, $state, mapService) {

    var buyreqs = [];
    // var bounds = [];
    var selectedReq = {};
    var highlightedReq = {};
    var url;

    var resetBuyreqs = function(){
      buyreqs = [];
      // bounds = [];
      selectedReq = {};
      highlightedReq = {};
      url='';
      $rootScope.$broadcast('selectedReq:update');
    };


    var updateBuyReqs = function(search){
      if (url==='') {
        console.log('url problem');
      } else {
        // bounds=mapService.getSearchBounds();
        // if (bounds.length === 0){ return;}
        // update mongo query object map bounds
        var query = {};
        // query.centers = {
        //   $geoWithin: {
        //     $box: [
        //       bounds[0],
        //       bounds[1]
        //     ]
        //   }
        // };

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
      }

    };

    var updateBroker = function(selectedReq){
      if (selectedReq && selectedReq.user){
        $http.get('/api/users/' + selectedReq.user).then(response => {
          selectedReq.broker = response.data;
          selectedReq.shareLink = location.host + '/broker/' + selectedReq.broker.userId + '/detail/' + selectedReq._id;
        })
        .catch(err => {console.log(err);});
      }
    };


    var updateSelectedReq = function(id){
      if (!id){
        selectedReq = {};
        mapService.resetBounds();
        $rootScope.$broadcast('selectedReq:update');
      } else {
        selectedReq = _.find(buyreqs, { '_id': id });
        if (selectedReq) {
          mapService.fitToReq(selectedReq);
          $rootScope.$broadcast('selectedReq:update');
          updateBroker(selectedReq);
        } else {
          $http.get('/api/buyreqs/'+ id).then(response => {
            selectedReq = response.data;
            mapService.fitToReq(selectedReq);
            $rootScope.$broadcast('selectedReq:update');
            updateBroker(selectedReq);
          });
        }
      }
    };


    return {
      updateBuyReqs: updateBuyReqs,
      getBuyReqs: function(){return buyreqs;},
      resetBuyreqs: resetBuyreqs,
      updateSelectedReq: updateSelectedReq,
      getSelectedReq: function(){return selectedReq || {} ;},
      getHighlightedReq: function(){return highlightedReq;},
      updateUrl: function(newUrl){url=newUrl;}
    };
  });
