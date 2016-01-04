angular.module('app')
.controller('ProductParameterEditController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'selectedProductParm', 'parameters', 'ProductParameter', 'user',
  function($scope, $state, $stateParams, selectedProduct, selectedProductParm, parameters, ProductParameter, user){
    console.log('State ' + $state.current.name);

    $scope.product = selectedProduct;
    $scope.parameters = parameters;
    $scope.productParameter = angular.copy(selectedProductParm);

    $scope.save = function(prodParm){
      console.log('Entered save()');
      prodParm.lstUpdtId = user.id;

      ProductParameter.update({ id: prodParm.prdctParmGid }, prodParm, function(data){
        console.log('Updated Product Parameter');
        angular.extend(selectedProductParm, data);

        $state.go('products.selected.parameters.selected.detail', {
          productId: $stateParams.productId,
          productParmId: $stateParams.productParmId
        });
      });
    };
  }
]);
