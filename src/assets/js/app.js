(function(angular) {
  'use strict';
  angular.module('myApp',
    [
      'ngRoute',
      'ngMap',

      'helloModule',
      'contactModule',
      'checkinModule',
      'LocalStorageModule'
    ])

  .config(function($routeProvider) {

    $routeProvider
      .when('/', {
       templateUrl: 'assets/template/checkinList.html',
     })
     .when('/checkin/:checkinId', {
      templateUrl: 'assets/template/checkinDetails.html',
      controller: 'checkDetailsController'
    });

  });

})(window.angular);
