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
      var getWeather = function(checkin) {
        console.log(checkin);
        $http({
          method: 'GET',
          url: 'http://api.openweathermap.org/data/2.5/weather?lat='+checkin.lat+'&lon='+checkin.lng+'&APPID=72dc62c8fb5c498073c30f58585331b7',
          headers: {
            'Content-Type': undefined
          }
          }).then(function successCallback(response) {
          checkin.meteo = response.data;
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        }

      $http({
        method: 'GET',
        url: 'http://checkin-api.dev.cap-liberte.com/checkin/' +  $routeParams.checkinId
      }).then(function successCallback(response) {
        var checkinDetails = response.data
        var checkinDetailsLat = response.data.lat
        var checkinDetailsLng = response.data.lng
        getWeather(checkinDetails);
        $scope.checkinDetails = checkinDetails;
        $scope.checkinDetailsLat = checkinDetailsLat;
        $scope.checkinDetailsLng = checkinDetailsLng;
        checkinDetailsLat = parseFloat(checkinDetails.lat)
        checkinDetailsLng = parseFloat(checkinDetails.lng);
        console.log(typeof(checkinDetailsLng));


      } , function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    })
    .controller('checkSyncController', function($scope, $rootScope, $http, $routeParams, localStorageService) {
      $scope.submit = function(){
        var tabCheckIn = localStorageService.get('checkins');
        console.log("tab" + tabCheckIn);
        console.log("tab taille" + tabCheckIn.length);
        for (var i = 0; i < tabCheckIn.length; i++) {
          envoi(tabCheckIn,i);
        }
      }
      function envoi(tab, i){

        $http({
          method: 'POST',
          url: 'http://checkin-api.dev.cap-liberte.com/checkin',
          data : {
            //envoie des données lors du submit
            lat: tab[i].lat,
            lng: tab[i].lng
          },
          headers: {
            'Content-Type': undefined
          }
        }).then(function successCallback(response) {

            $rootScope.$broadcast("listChange");

        }, function errorCallback(response) {
            console.log("error: "+response);
        });
        localStorageService.remove("checkins")
      }
    })

    .controller('checkinFormController', function($scope, $rootScope, $http, localStorageService) {

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
          }else{
            console.log("Geolocation is not supported by this browser.");
          }
        };

        $scope.submit = function() {

        var checkIns = localStorageService.get('checkins');
            if(checkIns == null){
              checkIns=[];
            }
            var checkIn = {
              lat: $scope.lat,
              lng: $scope.lng
            }
            checkIns.push(checkIn);
            localStorageService.set('checkins', checkIns);
            $rootScope.$broadcast("compteurChange");
        }
        $scope.$on("compteurChange", function() {
          var tabCheckIn = localStorageService.get('checkins');
          console.log(tabCheckIn);
          console.log(tabCheckIn.length);
          $scope.compteur=tabCheckIn.length;
          console.log($scope.compteur);

        });
      });
})(window.angular);
