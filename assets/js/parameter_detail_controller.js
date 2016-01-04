angular.module('app')
.controller('ParameterDetailController', [
  '$scope', '$state', '$stateParams', 'selectedParameter', 'productParameters', 'Parameter',
  function($scope, $state, $stateParams, selectedParameter, productParameters, Parameter){
    console.log('State ' + $state.current.name);

    $scope.parameter = selectedParameter;
    $scope.productParameters = productParameters;

    $scope.delete = function(parameter){
      console.log('Entered delete()');

      Parameter.delete({ id: parameter.parmGid }, function(response){
        console.log('Deleted Parameter');
        $state.go('parameters.list');
      });
    };
  }
]);
