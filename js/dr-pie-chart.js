var app = angular.module('drPieGraph', ['nvd3']);

app.controller('drCtrlPieChart', ['$scope', 'drAppFactory', function($scope, drAppFactory) {
  $scope.options = {
            chart: {
                type: 'pieChart',
                height: 800,
                width: 650,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 5,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                },
                tickPading: 0,
                pie: {
                    dispatch: { //container of event handlers
                        elementClick: function(e){ 
                          console.log(e);
                          $scope.pieClicked(e);
                          //Integrate the grid popup code
                        }
                    }
                }
            }
        };
        
         $scope.pieClicked = function(e){
          
          $scope.$emit('banksFilterByCity', e);
        };
        
        //Call accordingly broadcast message begins
        $scope.$on('refreshPieGraph', function(e) {
          $scope.api.clearElement();
          $scope.api.refreshWithTimeout(800);
        });
        $scope.$on('clearPieGraph', function(e) {
          $scope.api.clearElement();
        });
        //Call accordingly broadcast message ends
        
        drAppFactory.getBanksPieChart().then(function (responseData) {
        
          $scope.data = responseData.data;
        
       });
}]);
