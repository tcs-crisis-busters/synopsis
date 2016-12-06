(function(){
angular.module('drApp', ['dataGrid', 'pagination', 'ngMaterial', 'drAppTrends', 'drDiscreteGraph', 'drPieGraph', 'drScartedGraph', 'drDGrid'])
    .config(['$httpProvider', '$mdThemingProvider', function($httpProvider, $mdThemingProvider) {
        $mdThemingProvider.theme('default')
          .primaryPalette('deep-purple')
          .accentPalette('purple')
          .warnPalette('red')
          .backgroundPalette('blue-grey')
          ;
          
        //CORP fix code to use sloop api
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
      }
    ])
    .controller('drAppController', ['$scope', 'drAppFactory', '$mdDialog', '$interval', '$rootScope', function ($scope, drAppFactory, $mdDialog, $interval, $rootScope) {
      
        $rootScope.progress = 0;
        var self = this, j= 0, counter = 0;

        self.mode = 'query';
        self.activated = true;
        self.determinateValue = 30;
        self.determinateValue2 = 30;
    
        self.showList = [ ];
        
        $interval(function() {
          self.determinateValue += 1;
          self.determinateValue2 += 1.5;
    
          if (self.determinateValue > 100) self.determinateValue = 30;
          if (self.determinateValue2 > 100) self.determinateValue2 = 30;
    
            // Incrementally start animation the five (5) Indeterminate,
            // themed progress circular bars
    
            if ( (j < 2) && !self.showList[j] && self.activated ) {
              self.showList[j] = true;
            }
            if ( counter++ % 4 == 0 ) j++;
    
            // Show the indicator in the "Used within Containers" after 200ms delay
            if ( j == 2 ) self.contained = "indeterminate";
    
        }, 100, 0, true);
    
        $interval(function() {
          self.mode = (self.mode == 'query' ? 'determinate' : 'query');
        }, 7200, 0, true);
        
        /*People Grid*/
        $scope.peopleGridOptions = {
            data: [],
            urlSync: false,
            sort: {
                    predicate: 'total',
                    direction: 'desc'
                }
        };
        
        $scope.peopleGridActions = {};
        
        drAppFactory.getPeopleData().then(function (responseData) {
            $scope.peopleGridOptions.data = responseData.data;
            $rootScope.progress += 1;
            if($rootScope.progress > 1) {
              $rootScope.isLoaded = true;
              $rootScope.alterInput();
            }
        });
        
        /*Banks grid*/
        
         $scope.banksGridOptions = {
            data: [],
            sort: {
                    predicate: 'total',
                    direction: 'desc'
                }
        };
        
        $scope.banksGridActions = {};
        
        drAppFactory.getBanksData().then(function (responseData) {
            $scope.banksGridOptions.data = responseData.data;
            $rootScope.progress += 1;
            if($rootScope.progress > 1) {
              $rootScope.isLoaded = true;
              $rootScope.alterInput();
            }
        });
        
        //ontab changes
        $scope.onTabChange = function(messages){
          
          if(messages === undefined){
            $scope.$broadcast ('clearDiscreteGraph');
          }
          messages.forEach(function(message){
            
            $scope.$broadcast (message);
          });
        }
        
        /*Dialog filter by city grid */
        
        $scope.fPeopleGridOptions = {
            data: [],
            urlSync: false
        };
    
     $scope.fPeopleGridActions = {};
     
        $scope.$on("isLoaded", function(e, resp){
          $rootScope.isLoaded = resp;
        });
        
        $scope.$on("peopleFilterByCity", function(e, resp){
          $rootScope.isLoaded = false;
          document.getElementById('selectedCity').value = resp.data.label;
          $scope.showCityGrid('peopleByCity', resp);
        });
        
        $scope.$on("banksFilterByCity", function(e, resp){
          $rootScope.isLoaded = false;
          document.getElementById('selectedCity').value = resp.data.key; 
          $scope.showCityGrid('branchesByBank', resp);
        });
        
        $rootScope.alterInput = function(){
          var input = angular.element( document.querySelector( 'input' ) );
          for(i=0; i<input.length; i++){
              input[i].setAttribute('size', "20");
          }
        } 
        
        /*Tab grid*/
        $scope.showCityGrid = function(listName, resp) {
          console.log(resp.data.label);
          $mdDialog.show({
            controller: DialogController,
            templateUrl: "./view/" + listName+'.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: listName,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
            onComplete: function(){   }
          });
        }
        
        function DialogController($scope, $mdDialog) {
          $scope.hide = function() {
            $mdDialog.hide();
          };
         
        }
        
    }])
    .controller('drCtrlTrendsContainer', function($scope){
     //Citizen trends container
     //We dont want this? :-) ~
    })
    .factory('drAppFactory', function ($http) {
        return {
            getPeopleData: function () {
                return $http({
                    method: 'GET',
                    //url: 'http://0.0.0.0:3000/api/people/grid' //localhost
                    url: 'https://sloopapi.mybluemix.net/api/people/grid?page=1'
                    //url: './individual_list.json' //static
                });
            },
            getPeopleDataByCity: function (city) {
                //var endPoint = 'http://0.0.0.0:3000/api/people/grid?city=' + city; // localhost
                var endPoint = 'https://sloopapi.mybluemix.net/api/people/grid?city=' + city;
                return $http({
                    method: 'GET',
                    url: endPoint
                    //url: './individual_list_mumbai.json' //static
                });
            },
            getPeopleBarChart: function () {
                //var endPoint = 'http://0.0.0.0:3000/api/people/barChart'; // localhost
                var endPoint = 'https://sloopapi.mybluemix.net/api/people/barChart';
                return $http({
                    method: 'GET',
                    //url: endPoint
                    url: './json/people_bar_chart.json' //static
                });
            },
            getPeopleScatteredChart: function () {
                //var endPoint = 'http://0.0.0.0:3000/api/people/scatteredChart'; // localhost
                var endPoint = 'https://sloopapi.mybluemix.net/api/people/scatteredChart';
                return $http({
                    method: 'GET',
                    //url: endPoint
                    url: './json/people_scattered_chart.json' //static
                });
            },
            getBanksData: function(){
               return $http({
                    method: 'GET',
                    //url: 'http://0.0.0.0:3000/api/banks/grid' //localhost
                    url: 'https://sloopapi.mybluemix.net/api/banks/grid'
                    //url: './bank_list.json' //static
                });
            },
            getBanksDataByCity: function (city) {
                //var endPoint = 'http://0.0.0.0:3000/api/banks/grid?city=' + city; // localhost
                var endPoint = 'https://sloopapi.mybluemix.net/api/banks/grid?bankName=' + city;
                return $http({
                    method: 'GET',
                    url: endPoint
                    //url: './banks_list_hdfc.json' //static
                });
            },
            getBanksPieChart: function (city) {
                //var endPoint = 'http://0.0.0.0:3000/api/banks/pieChart'; // localhost
                var endPoint = 'https://sloopapi.mybluemix.net/api/banks/pieChart';
                return $http({
                    method: 'GET',
                    //url: endPoint
                    url: './json/banks_pie_chart.json' //static
                });
            }
      }
    })
})();
