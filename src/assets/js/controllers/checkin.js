(function(angular) {
  'use strict';
  angular.module('checkinModule',[])
    .controller('checkinController', function($scope, $http) {

        $http({
          method: 'GET',
          url: 'http://checkin-api.dev.cap-liberte.com/checkin'
        }).then(function successCallback(response) {
          console.log(response);
          $scope.checkin = response.data;

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });

    })

    .controller('checkDetailsController', function($scope, $http, $routeParams) {

      $http({
        method: 'GET',
        url: 'http://checkin-api.dev.cap-liberte.com/checkin/' +  $routeParams.checkinId
      }).then(function successCallback(response) {

        $scope.checkinDetails = response.data;

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    })

    .controller('checkinFormController', function($scope, $http) {
        $scope.submit = function() {

          $http({
            method: 'POST',
            url: 'http://checkin-api.dev.cap-liberte.com/checkin',
            data : {
              lat: $scope.lat,
              lng: $scope.lng
            },
            headers: {
              'Content-Type': undefined
            }
          }).then(function successCallback(response) {



          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        };
    });


})(window.angular);
