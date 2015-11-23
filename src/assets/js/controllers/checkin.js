(function(angular) {
  'use strict';
  angular.module('checkinModule',[])
    .controller('checkinController', function($scope, $http) {

      var getChekinList = function() {
        $http({
          method: 'GET',
          url: 'http://checkin-api.dev.cap-liberte.com/checkin'
        }).then(function successCallback(response) {
          $scope.checkin = response.data;
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }

      getChekinList();
      $scope.$on("listChange", function(e) {
        getChekinList();
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

    .controller('checkinFormController', function($scope, $rootScope, $http) {

        //Alimentation des input text avec les coordonnés de geolocalisation
        $scope.getLocation = function() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              //reactualisation du scope apres avoir accepté la geolocalisation
              $scope.$apply(function () {
                //insertion des valeurs dans les input
                $scope.lat = position.coords.latitude;
                $scope.lng = position.coords.longitude;
              })
            });
          } else {
            console.log("Geolocation is not supported by this browser.");
          }
        };

        $scope.submit = function() {

          $http({
            method: 'POST',
            url: 'http://checkin-api.dev.cap-liberte.com/checkin',
            data : {
              //envoie des données lors du submit
              lat: $scope.lat,
              lng: $scope.lng
            },
            headers: {
              'Content-Type': undefined
            }
          }).then(function successCallback(response) {

              $rootScope.$broadcast("listChange");

          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        };
    });



})(window.angular);
