angular.module('drDiscreteGraph', ['nvd3'])
 .controller('drCtrlBarChart', ['$scope', 'drAppFactory', function($scope, drAppFactory) {
  $scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                width: 500,
                margin : {
                    top: 30,
                    right: 0,
                    bottom: 100,
                    left: 115
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                showControls: true,
                valueFormat: function(d){
                    return d3.format(',.0f')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: 'Cities',
                    axisLabelDistance: 20,
                    tickPading: 15
                },
                yAxis: {
                    axisLabel: 'ITR eligible individuals Count',
                    axisLabelDistance: 20,
                    tickPading: 25
                    
                },
                discretebar: {
                    dispatch: { //container of event handlers
                        elementClick: function(e){ 
                          console.log(e);
                          $scope.barClicked(e);
                          //Integrate the grid popup code
                        }
                    }
                }
            }
        };
        
        $scope.barClicked = function(e){
          
          $scope.$emit('peopleFilterByCity', e);
        };
        
        
        
        //Call accordingly broadcast message begins
        $scope.$on('refreshDiscreteGraph', function(e) {
          $scope.api.clearElement();
          $scope.api.refreshWithTimeout(400);
        });
        $scope.$on('clearDiscreteGraph', function(e) {
          $scope.api.clearElement();
        });
        //Call accordingly broadcast message ends
        
        drAppFactory.getPeopleBarChart().then(function (responseData) {
        
        $scope.data = responseData.data;
        
       });
       
}]);
