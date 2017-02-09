'use strict';

angular.module('creapp3App')
.controller('pictureUploadCtrl', function($scope, mdPanelRef, pictureuploadService, bigImage){

  $scope._mdPanelRef = mdPanelRef;

  $scope.closePanel = function(){
    $scope._mdPanelRef.close()
      .finally(function(){
        pictureuploadService.updateCroppedImage($scope.images.croppedImage);
      });
  };

  $scope.images = {
    bigImage:bigImage,
    croppedImage:'nothing'
  };

});
