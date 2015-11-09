(function(angular) {
  'use strict';
  angular.module('checkinModule',[])
    .controller('checkinController', function($scope, $http) {
      console.log("check");

        $http({
          method: 'GET',
          url: 'http://checkin-api.dev.cap-liberte.com/checkin'
        }).then(function successCallback(response) {

          console.log(response.data)
          $scope.checkin = response.data;

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });

    });
})(window.angular);
