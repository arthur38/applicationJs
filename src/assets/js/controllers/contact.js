(function(angular) {
  'use strict';
  angular.module('contactModule',[])
    .controller('contactController', function() {
      this.contact =
      [
        {
          name: 'Arthur Bonnel',
          phone: '06 87 59 41 66'
        },
        {
          name: 'doe',
          phone: '06 87 59 45 66'
        }
      ]
    });
})(window.angular);
