angular.module('app')
.controller('AttributeEditController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'selectedFormat', 'selectedAttribute', 'aggregateFunctions', 'ProductAttribute', 'user',
  function($scope, $state, $stateParams, selectedProduct, selectedFormat, selectedAttribute, aggregateFunctions, ProductAttribute, user){
    console.log('State ' + $state.current.name);

    $scope.product = selectedProduct;
    $scope.format = selectedFormat;
    $scope.attribute = selectedAttribute;
    $scope.aggregateFunctions = aggregateFunctions;

    $scope.save = function(attribute){
      console.log('Entered save())');
      attribute.lstUpdtId = user.id;

      ProductAttribute.update({ id: attribute.prdctAtrbGid }, attribute, function(response){
        console.log('Updated Product Attribute');
        $state.go('products.selected.formats.selected.attributes.selected.detail', {
          productId: $stateParams.productId,
          formatId: $stateParams.formatId,
          attributeId: $stateParams.attributeId
        });
      });
    };
  }
]);
