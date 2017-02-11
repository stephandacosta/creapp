'use strict';

angular.module('creapp')
  .factory('buyreqsService', function ($http, appConstants) {


    var getStateName = function(stateCode){
      return appConstants.states.find(function(state){
        return stateCode === state.iso;
      }).name;
    };

    var getBuyReqs = function(url){

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

      return $http.get(url, {params: { query }}).then(response => {
        // update buyreqs list
        var reqs = response.data;
        // prefix type to the title
        reqs.forEach(function(buyreq){
          var tmp = buyreq.buy ? 'To Buy' : '';
          tmp = (buyreq.exchange ? (tmp==='' ? 'To Exchange' : tmp + '/Exchange') : tmp );
          tmp = (buyreq.lease ? (tmp==='' ? 'To Lease' : tmp + '/Lease') : tmp );
          buyreq.transactionTitle = tmp;
          buyreq.stateName = getStateName(buyreq.state);
        });

        return reqs;

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

    var getBroker = function(brokerId){
      if (brokerId){
        return $http.get('/api/users/' + brokerId).then(response => {
          return response.data;
        })
        .catch(err => {console.log(err);});
      } else {
        return undefined;
      }
    };

    var getSelectedReq = function(id){
      console.log('get selected req');
      if (!id){
        return {};
      } else {
        return $http.get('/api/buyreqs/'+ id)
        .then(response => {
          return response.data;
        });
      }
    };

    return {
      getBuyReqs: getBuyReqs,
      getBroker: getBroker,
      getSelectedReq: getSelectedReq
    };
  });
