(function(){
  "use strict";

  angular
   .module('drDGrid', ['ngMaterial'])
   .controller('drCtrlDGrid',['$scope', '$mdDialog', 'drAppFactory','$rootScope', function($scope, $mdDialog, drAppFactory, $rootScope) {

     $scope.fPeopleGridOptions = {
            data: [],
            urlSync: false,
             sort: {
                    predicate: 'total',
                    direction: 'desc'
                }
        };
    
     $scope.fPeopleGridActions = {};
     
     drAppFactory.getPeopleDataByCity(document.getElementById('selectedCity').value.toUpperCase()).then(function (responseData) {
        $rootScope.isLoaded = true;
        $scope.fPeopleGridOptions.data = responseData.data;
        $rootScope.alterInput();
     });
    
     $scope.fBanksGridOptions = {
            data: [],
            urlSync: false,
             sort: {
                    predicate: 'total',
                    direction: 'desc'
                }
        };
    
     $scope.fBanksGridActions = {};
     
     drAppFactory.getBanksDataByCity(document.getElementById('selectedCity').value.toUpperCase()).then(function (responseData) {
              $rootScope.isLoaded = true;
              $scope.fBanksGridOptions.data = responseData.data;
              $rootScope.alterInput();
     }); 
     
      
}])

})();