(function(angular) {
  'use strict';
  angular.module('contactModule',[])
    .controller('contactController', function() {
      this.contact =
      [
        {
          name: 'Joris Nicolas',
          phone: '06 87 59 41 66'
        },
        {
          name: 'doe',
          phone: '06 87 59 45 66'
        }
      ]
    });
})(window.angular);
