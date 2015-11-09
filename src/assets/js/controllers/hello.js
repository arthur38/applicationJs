(function(angular) {
  'use strict';
  angular.module('helloModule',[])
    .controller('helloController', function() {

      this.afficheLongueur = function(string) {
        if(typeof string !== 'undefined') {
          return string.length;
        }
        return 0;
      };

      this.upperChaine = function(string) {
        if(typeof string !== 'undefined') {
          return string.toUpperCase();
        }
        return string;
      };

      this.splitToList = function(string) {

        if(typeof string !== 'undefined') {
          return string.split("");
        }
        return string;
      };

    });
})(window.angular);
