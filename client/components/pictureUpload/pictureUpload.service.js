'use strict';

angular.module('creapp3App')
  .factory('pictureuploadService', function ($rootScope, $http, $mdPanel) {

    // timestamp used to remove use of cached picture on update
    var timestamp = new Date().getTime();
    // holds the cropped image
    var croppedImage;

    // panel for image cropping
    var showPictureUpload = function (imagesrc) {

      var config = {
        controller: 'pictureUploadCtrl',
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
        panelRef = undefined;
      });
    };

    // trigger the picture cropping pannel after file selection
    var loadPictureForm = function(files){
      var file = files[0];
      if (!file.type.match(/image.*/)) {
        // this file is not an image.
        console.log('not an image');
      } else {
        var img = document.createElement('img');
        img.src = window.URL.createObjectURL(file);
        showPictureUpload(img.src);
      }
    };

    // convert image url to blob
    var getBlob = function(){
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

    // get signature to get write access to profile picture
    var getSignature = function(){
      return $http.jsonp('/api/pictures/getsignature?callback=JSON_CALLBACK');
    };

    // promise that returns after picture has been uploaded
    var uploadImageToStorage = function(signature){
      var blob = getBlob();
      // upload blob
      return $http.put(
        'https://creapp.blob.core.windows.net/brokerpics/'+signature.data.userId+'?'+signature.data.url,
        blob,
        {headers: {'x-ms-blob-type': 'BlockBlob'}}
      );
    };

    // promise that returns after picture has been deleted in storage
    var deleteImageFromStorage = function(){
      // server to restore default image
      return $http.delete('api/pictures');
    };

    // returns broker picture link to image storage
    var getBrokerPictureLink = function(userId){
      return 'https://creapp.blob.core.windows.net/brokerpics/'+userId + '?'+ timestamp;
    };


    return {
      updateTimestamp: function(){
        timestamp = new Date().getTime();
      },
      loadPictureForm : loadPictureForm,
      showPictureUpload : showPictureUpload,
      updateCroppedImage : function(picture){
        croppedImage = picture;
        $rootScope.$broadcast('croppedImage:change');
      },
      getCroppedImage : function(){
        return croppedImage;
      },
      getBrokerPictureLink : getBrokerPictureLink,
      getSignature: getSignature,
      uploadImageToStorage : uploadImageToStorage,
      deleteImageFromStorage : deleteImageFromStorage
    };

  });
