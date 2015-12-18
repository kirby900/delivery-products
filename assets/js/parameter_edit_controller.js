angular.module('app')
.controller('ParameterEditController', [
  '$scope', '$state', '$stateParams', 'selectedParameter', 'ParameterDataType', 'Parameter',
  function($scope, $state, $stateParams, selectedParameter, ParameterDataType, Parameter){
    console.log('State ' + $state.current.name);

    $scope.types = ParameterDataType.types;
    $scope.parameter = selectedParameter;

    $scope.save = function(parameter){
      console.log('Entered save()');

      Parameter.update({ id: parameter.parmGid }, parameter, function(response){
        console.log('Updated Parameter');
        $state.go('parameters.selected.detail', {
          parameterId: $stateParams.parameterId
        });
      });
    };
  }
]);
