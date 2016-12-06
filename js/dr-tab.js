(function(){
  'use strict';
  
  angular.module('drAppTrends', ['ngMaterial'])
  .controller('drCtrlTrends', function($scope){
    $scope.onTabChange = function(messages){
      
      if(messages === undefined){
        $scope.$broadcast ('clearDiscreteGraph');
      }
      messages.forEach(function(message){
        
        $scope.$broadcast (message);
      });
    }
  });
})();
