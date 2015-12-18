angular.module('app')
.controller('ParameterDetailController', [
  '$scope', '$state', '$stateParams', 'selectedParameter', 'Parameter',
  function($scope, $state, $stateParams, selectedParameter, Parameter){
    console.log('State ' + $state.current.name);

    $scope.parameter = selectedParameter;

    $scope.delete = function(parameter){
      console.log('Entered delete()');

      Parameter.delete({ id: parameter.parmGid }, function(response){
        console.log('Deleted Parameter');
        $state.go('parameters.list');
      });
    };
  }
]);
