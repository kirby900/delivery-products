angular.module('app')
.controller('ParameterNewController', [
  '$scope', '$state', 'ParameterDataType', 'Parameter', 'user',
  function($scope, $state, ParameterDataType, Parameter, user) {
    console.log('State ' + $state.current.name);

    $scope.types = ParameterDataType.types;

    $scope.parameter = {
      parmDataTyp: 'STRING'
    };

    $scope.save = function(parameter){
      console.log('Entered save()');
      parameter.lstUpdtId = user.id;

      Parameter.save(parameter, function(response){
        console.log('Saved Parameter');
        $state.go('parameters.list');
      });
    };
  }
]);
