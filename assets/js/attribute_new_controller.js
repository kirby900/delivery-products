angular.module('app')
.controller('AttributeNewController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'selectedFormat', 'aggregateFunctions', 'ProductAttribute', 'user',
  function($scope, $state, $stateParams, selectedProduct, selectedFormat, aggregateFunctions, ProductAttribute, user){
    console.log('State ' + $state.current.name);

    $scope.product = selectedProduct;
    $scope.format = selectedFormat;
    $scope.aggregateFunctions = aggregateFunctions;

    $scope.attribute = {
      prdctFrmtGid: selectedFormat.prdctFrmtGid,
      atrbDataAlgnCde: 'L',
      atrbIsFlrInd: 'N',
      atrbDataTypTxt: 'TEXT',
      atrbMaxLngthNbr: 10,
      atrbPivotInd: 'N',
      atrbRqrdInd: 'N',
      splitFileOnAtrbValInd: 'N',
      stdAtrbInd: 'N',
      unpivotIdTrgtAtrbInd: 'N',
      unpivotValTrgtAtrbInd: 'N',
      lstUpdtId: user.id
    };

    $scope.save = function(attribute){
      ProductAttribute.save(attribute, function(response){
        console.log('Saved Product Attribute');

        $state.go('products.selected.formats.selected.attributes.list', {
          productId: $stateParams.productId,
          formatId: $stateParams.formatId
        });
      });
    };
  }
]);
