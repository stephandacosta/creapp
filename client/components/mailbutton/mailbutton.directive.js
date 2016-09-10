angular.module('creapp3App')
  .directive('mailbutton', function ($mdDialog, buyreqs) {
    return {
      templateUrl: 'components/mailbutton/mailbutton.html',
      restrict: 'E',
      scope: {
        broker: '=broker',
        buyreq: '=buyreq'
      },
      link: function (scope, element, attrs) {

        scope.showMailForm = function(ev){

          var selectedReq = buyreqs.getSelectedReq();

          $mdDialog.show({
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true,
            templateUrl:'app/mailForm/mailForm.html',
            locals: {
              userId: scope.broker.userId || scope.broker.href.substr(scope.broker.href.lastIndexOf('/') + 1),
              brokerName: scope.broker.fullName,
              buyreqId: selectedReq._id || '',
              buyreqTitle: selectedReq.title || 'no specific buy/lease requirement'
            },
            controller: 'mailFormCtrl'
          });
        };

      }
    };
  });
