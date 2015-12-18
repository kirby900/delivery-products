angular.module('app')
.controller('ParameterListController', [
  '$scope', '$state', 'parameters', 'Parameter',
  function($scope, $state, parameters, Parameter){
    console.log('State ' + $state.current.name);

    $scope.parameters = parameters;

    $scope.sortOptions = {
      key: 'parmNam',
      reverse: false
    };

    $scope.sort = function(key){
      if ( key === $scope.sortOptions.key ){
        $scope.sortOptions.reverse = !$scope.sortOptions.reverse;
      } else {
        $scope.sortOptions.key = key;
        $scope.sortOptions.reverse = false;
      }
    };
  }
]);
