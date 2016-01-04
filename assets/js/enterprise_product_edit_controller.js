angular.module('app')
.controller('EnterpriseProductEditController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'EnterpriseProduct', 'user',
  function($scope, $state, $stateParams, selectedProduct, EnterpriseProduct, user){
    console.log('Entered products.selected.edit');

    $scope.product = angular.copy(selectedProduct);

    $scope.isModified = function(){
      return dirty;
    };

    $scope.save = function(product){
      console.log('Entered save()');
      product.lstUpdtId = user.id;

      EnterpriseProduct.update({ id: product.entrpPrdctGid }, product, function(data){
        console.log('Updated Enterprise Product');
        angular.extend(selectedProduct, data);
        
        $state.go('products.selected.detail', {
          productId: $stateParams.productId
        });
      });
    };
  }
]);
