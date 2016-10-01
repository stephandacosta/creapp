'use strict';

angular.module('creapp3App')
  .factory('pictureuploadService', function ($rootScope, $http, $mdPanel, $mdMedia) {

    var showPictureUpload = function (imagesrc) {

      // var panelPosition = $mdPanel.newPanelPosition()
      //   .absolute()
      //   .left((window.innerWidth/2 - 150) + 'px')
      //   .top((window.innerHeight/2 - 150) + 'px');

      var config = {
        controller: pictureUploadCtrl,
        controllerAs: 'pictureUploadCtrl',
        locals : {bigImage: imagesrc},
        // position: panelPosition,
        zIndex: 1000,
        panelClass : 'pictureUpload',
        templateUrl: 'components/pictureUpload/pictureUpload.html',
        clickOutsideToClose: true,
        escapeToClose: true,
        focusOnOpen: true,
        hasBackdrop: false,
        fullscreen: true
        // onDomRemoved: detachHotzones
      };

      var panelRef = $mdPanel.create(config);
      panelRef.open()
          .finally(function() {
            // var outerWrapper = document.getElementsByClassName('md-panel-outer-wrapper')[0];
            // outerWrapper.className += " tourPanelWrapper";
            panelRef = undefined;
          });
    };

    var croppedImage;

    // convert image url to blob
    var getBlob = function(){
      //get image url
      // var cropped = angular.element(document.getElementById('croppedImage'));
      // var imgurl = cropped.attr('src');
      //convert to blob
      var encoded = croppedImage.replace(/^data:image\/[a-z]+;base64,/, '');
      var byteCharacters = atob(encoded);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var blob = new Blob([byteArray], {type: 'image/png'});
      return blob;
    };


    // add loading bar
    // https://github.com/chieffancypants/angular-loading-bar
    var uploadImageToStorage = function(){
      var blob = getBlob();
      // get signature
      $http.jsonp("/api/pictures/getsignature?callback=JSON_CALLBACK")
      .then(function(result){
        // upload blob
        $http.put('https://creapp.blob.core.windows.net/brokerpics/'+result.data.userId+'?'+result.data.url,
        blob,
        {headers: {'x-ms-blob-type': 'BlockBlob'}}
        ).then(function(result){
            console.log(result);
            $rootScope.$broadcast("uploadPicture:success");
          },function(error){
            console.log('failed to upload');
            console.log(error);
          });
      }, function(error){
        console.log('failed to get signature');
        console.log(error);
      });
    };

    var deleteImageFromStorage = function(){
      // get signature
      $http.jsonp("/api/pictures/getsignature?callback=JSON_CALLBACK")
      .then(function(result){
        // upload blob
        $http.delete('https://creapp.blob.core.windows.net/brokerpics/'+result.data.userId+'?'+result.data.url,
        {headers: {'x-ms-delete-snapshots': 'include'}}
        ).then(function(result){
            console.log(result);
            $rootScope.$broadcast("deletePicture:success");
          },function(error){
            console.log('failed to delete');
            console.log(error);
          });
      }, function(error){
        console.log('failed to get signature');
        console.log(error);
      });
    };


    return {
      showPictureUpload : showPictureUpload,
      updateCroppedImage : function(picture){
        croppedImage = picture;
        $rootScope.$broadcast("croppedImage:change");
      },
      getCroppedImage : function(){
        return croppedImage;
      },
      getBrokerPicLink : function(userId){
        return 'https://creapp.blob.core.windows.net/brokerpics/'+userId ;
      },
      uploadImageToStorage : uploadImageToStorage,
      deleteImageFromStorage : deleteImageFromStorage
    };

  })
