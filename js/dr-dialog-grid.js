(function(){
  "use strict";

  angular
  .module('drDGrid', ['ngMaterial'])
  .config(['$httpProvider', function($httpProvider) {
          
        //CORP fix code to use sloop api
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
      }
    ])
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
    
     if( $rootScope.dialogReq === 'people') { 
     drAppFactory.getPeopleDataByCity(document.getElementById('selectedCity').value.toUpperCase()).then(function (responseData) {
        $rootScope.isLoaded = true;
        $scope.fPeopleGridOptions.data = responseData.data;
        $rootScope.alterInput();
     });
     }
    
     $scope.fBanksGridOptions = {
            data: [],
            urlSync: false,
             sort: {
                    predicate: 'total',
                    direction: 'desc'
                }
        };
    
     $scope.fBanksGridActions = {};
     
     if( $rootScope.dialogReq === 'banks') { 
     drAppFactory.getBanksDataByCity(document.getElementById('selectedBank').value.toUpperCase()).then(function (responseData) {
              $rootScope.isLoaded = true;
              $scope.fBanksGridOptions.data = responseData.data;
              $rootScope.alterInput();
     });
     }
     
      
}])

})();
