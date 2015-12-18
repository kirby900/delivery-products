angular.module('app')
.controller('AttributeDetailController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'selectedFormat', 'selectedAttribute', 'ProductAttribute',
  function($scope, $state, $stateParams, selectedProduct, selectedFormat, selectedAttribute, ProductAttribute){
    console.log('State ' + $state.current.name);

    $scope.product = selectedProduct;
    $scope.format = selectedFormat;
    $scope.attribute = selectedAttribute;

    $scope.delete = function(attribute){
      ProductAttribute.delete({ id: attribute.prdctAtrbGid }, function(response){
        console.log('Deleted Product Attribute');

        $state.go('products.selected.formats.selected.attributes.list', {
          productId: $stateParams.productId,
          formatId: $stateParams.formatId
        });
      });
    };
  }
]);
