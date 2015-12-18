angular.module('app')
.controller('ProductParameterDetailController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'selectedProductParm', 'ProductParameter',
  function($scope, $state, $stateParams, selectedProduct, selectedProductParm, ProductParameter){
    console.log('State ' + $state.current.name);

    $scope.product = selectedProduct;
    $scope.productParameter = selectedProductParm;

    $scope.delete = function(prodParm){
      console.log('Entered delete()');

      ProductParameter.delete({ id: prodParm.prdctParmGid }, function(response){
        console.log('Deleted Product Parameter');

        $state.go('products.selected.parameters.list', {
          productId: $stateParams.productId
        });
      });
    };
  }
]);
