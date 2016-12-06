var app = angular.module('drScartedGraph', ['nvd3']);

app.controller('drCtrlScartedChart',['$scope', 'drAppFactory', function($scope, drAppFactory) {
 
 $scope.options = {
            chart: {
                type: 'scatterChart',
                height: 450,
                width: 500,
                color: d3.scale.category10().range(),
                scatter: {
                    onlyCircles: false
                },
                showDistX: true,
                showDistY: true,
                tooltipContent: function(key) {
                    return '<h3>' + key + '</h3>';
                },
                duration: 350,
                xAxis: {
                    axisLabel: 'Fiscal Years',
                    tickFormat: function(d){
                        return d3.format('.0f')(d);
                    },
                    axisLabelDistance: 15,
                    tickPading: 20
                },
                yAxis: {
                    axisLabel: 'ITR eligible individuals count',
                    tickFormat: function(d){
                        return d3.format('.0f')(d);
                    },
                    axisLabelDistance: 15,
                    tickPading: 25
                },
                zoom: {
                    //NOTE: All attributes below are optional
                    enabled: false,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: false,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };
        
        //Call accordingly broadcast message begins
        $scope.$on('refreshScatteredGraph', function(e) {
          $scope.api.clearElement();
          $scope.api.refreshWithTimeout(400);
        });
        $scope.$on('clearScatteredGraph', function(e) {
          $scope.api.clearElement();
        });
        //Call accordingly broadcast message ends

        generateData(2,4);
        //$scope.options.chart.forceY = [0, 999999];
        /* Random Data Generator (took from nvd3.org) */
        function generateData(groups, points) {
            var data = [],
                shapes = ['circle', 'cross', 'triangle-up', 'square', 'diamond', 'triangle-down'];
                
                var response = {};
               return drAppFactory.getPeopleScatteredChart().then(function (responseData) {
                console.log(responseData.data)
                response = responseData.data;
                random = d3.random.normal();
                for (var i = 0; i < response.cities.length; i++) {
                      var city  = response.cities[i];
                      data.push({
                          key: city,
                          values: []
                      });
    
                    for (var j = 0; j < response[city].length; j++) {
                        data[i].values.push({
                            x: (response.curYear - response[city][j].lastItrFiled)
                            , y: response[city][j].individualCount
                            , size: Math.random()
                            , shape: shapes[j]
                        });
                    }
                    
                }
                console.log(data); //tmp
                $scope.data = data;
        
               });
                
            
                
                
        }
}]);
