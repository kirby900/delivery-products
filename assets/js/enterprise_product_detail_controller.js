angular.module('app')
.controller('EnterpriseProductDetailController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'EnterpriseProduct',
  function($scope, $state, $stateParams, selectedProduct, EnterpriseProduct){
    console.log('State ' + $state.current.name);

    $scope.product = selectedProduct;

    $scope.delete = function(product){
      EnterpriseProduct.delete({ id: product.entrpPrdctGid }, function(response){
        console.log('Deleted Enterprise Product');
        $state.go('products.list');
      });
    };
  }
]);
