angular.module('app')
.controller('ProductParameterEditController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'selectedProductParm', 'parameters', 'ProductParameter', 'user',
  function($scope, $state, $stateParams, selectedProduct, selectedProductParm, parameters, ProductParameter, user){
    console.log('State ' + $state.current.name);

    $scope.product = selectedProduct;
    $scope.productParameter = selectedProductParm;
    $scope.parameters = parameters;

    $scope.save = function(prodParm){
      console.log('Entered save()');
      prodParm.lstUpdtId = user.id;

      ProductParameter.update({ id: prodParm.prdctParmGid }, prodParm, function(response){
        console.log('Updated Product Parameter');

        $state.go('products.selected.parameters.selected.detail', {
          productId: $stateParams.productId,
          productParmId: $stateParams.productParmId
        });
      });
    };
  }
]);
