'use strict';

angular.module('creapp3App')
  .controller('ProfileCtrl', function ($scope, $http, $mdToast, $user) {

    $scope.userEdit = _.cloneDeep($user.currentUser);

    //funciton to show toasts
    var showToast = function(msg){
      $mdToast.show(
        $mdToast.simple()
        .textContent(msg)
        .position('top left')
        .parent(document.getElementById('toasts'))
        .hideDelay(3000)
      );
    };

    $scope.myImage='';
    $scope.myCroppedImage='';

    $scope.cropit = function(files, event, flow){

      // after upload with flow.js update crop variable using url generated (used filereader in flow-ig directive)
      var picture = angular.element(document.getElementById('image'));
      var scope = picture.scope();
      scope.$watch(function(){
          return picture.attr('src');
      }, function(newVal){
        if (newVal!==undefined){
            $scope.myImage=newVal;
        }
      });

    };

    var bloburl;
    $scope.getSignature = function(){
      // console.log($scope.myCroppedImage);
      var cropped = angular.element(document.getElementById('croppedImage'));
      var imgurl = cropped.attr('src');
      var encoded = imgurl.replace(/^data:image\/[a-z]+;base64,/, '');
      // console.log(imgurl);
      var byteCharacters = atob(encoded);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var blob = new Blob([byteArray], {type: 'image/png'});

      console.log(blob);




      $http.jsonp("/api/pictures/getsignature?callback=JSON_CALLBACK")
        .success(function(result){
          bloburl = result.url;
          console.log(bloburl);
          // add loading bar
          // https://github.com/chieffancypants/angular-loading-bar
          $http.put('https://creapp.blob.core.windows.net/brokerpics/testblobpic2?'+bloburl,
          // $http.put('https://blob.creapp.us/brokerpics/testblobpic2?'+bloburl,
            blob,
            {
              headers: {'x-ms-blob-type': 'BlockBlob'}
            }
          ).then(function(result){
            console.log(result);
          });
        });


    };


    // $scope.uploadtest = function(){
      // console.log('sould upload');
      // $http.get('/api/pictures').then(function(res){
      //   console.log(res);
      // });
      // var c = new Croppie(document.getElementById('pic'));
      // c.bind({
      //   url:"https://creapp.blob.core.windows.net/brokerpics/testblobpic"
      // });
    // };


    $scope.saveUserEdits = function(){
      $http.put('/api/users/', $scope.userEdit).then(function(res){
        $user.get()
        .then(function (user) {
          showToast('user profile successfully updated');
          // hack: refresh document to get user refreshed (the current sdk methods always get from cache)
          location.reload();
        })
        .catch(function (error) {
          showToast('user profile successfully but problem retrieving from server');
        });
      }, function(err){
        showToast('there was a problem updating the profile');
      });
    };


    $scope.profileLink = location.host + '/broker/' + $user.currentUser.href.substr($user.currentUser.href.lastIndexOf('/') + 1) + '/list';

    var clipboard = new Clipboard('#shareProfile');
    clipboard.on('success', function(e) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('link has been copied to your clipboard, paste it anywhere')
        .position('top left')
        .parent(document.getElementById('toasts'))
        .hideDelay(3000)
      );
    });



  });
