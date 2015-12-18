angular.module('app')
.controller('ProductParameterNewController', [
  '$scope', '$state', '$stateParams', 'parameters', 'usedParameters', 'selectedProduct', 'ProductParameter', 'user',
  function($scope, $state, $stateParams, parameters, usedParameters, selectedProduct, ProductParameter, user) {
    console.log('State ' + $state.current.name);

    // Build list of unassigned parameters by removing
    // assigned parameters from full parameter list.
    var assignedParmKeys = {};
    usedParameters.forEach(function(parm){
      assignedParmKeys[parm.parmGid] = 1;
    });

    var availableParameters = [];
    parameters.forEach(function(parm){
      if ( !assignedParmKeys[parm.parmGid] ){
        availableParameters.push(parm);
      }
    });

    $scope.product = selectedProduct;
    $scope.parameters = availableParameters;

    $scope.productParameter = {
      entrpPrdctGid: $stateParams.productId,
      minOcrncNbr: 0,
      maxOcrncNbr: 99,
      clctdParmInd: 'N',
      lstUpdtId: user.id
    };

    $scope.save = function(prodParm){
      console.log('Entered save()');

      ProductParameter.save(prodParm, function(response){
        console.log('Saved Product Parameter');

        $state.go('products.selected.parameters.list', { 
          entrpPrdctGid: $stateParams.entrpPrdctGid
        });
      });
    };
  }
]);
