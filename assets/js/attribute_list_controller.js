angular.module('app')
.controller('AttributeListController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'selectedFormat', 'productAttributes', 'ProductAttribute', 'user',
  function($scope, $state, $stateParams, selectedProduct, selectedFormat, productAttributes, ProductAttribute, user){
    console.log('State ' + $state.current.name);

    $scope.product = selectedProduct;
    $scope.format = selectedFormat;
    $scope.attributes = productAttributes;

    $scope.sortOptions = {
      key: 'atrbOrdrNbr',
      reverse: false
    };

    $scope.sort = function(key){
      console.log('Sort by ' + key);
      if ( key === $scope.sortOptions.key ){
        console.log('Toggle sort order');
        $scope.sortOptions.reverse = !$scope.sortOptions.reverse;
      } else {
        $scope.sortOptions.key = key;
        $scope.sortOptions.reverse = false;
      }
    };

    $scope.updateFlag = function(prodAttr, propertyName){
      console.log('Entered updateFlag()');
      console.log(prodAttr.atrbNam + ': updating ' + propertyName + ' to ' + prodAttr[propertyName]);

      // Create an object with only the changing properties,
      // rather than updating the _entire_ set of columns.
      var atrb = {};
      atrb[propertyName] = prodAttr[propertyName];
      atrb.lstUpdtId = user.id;

      ProductAttribute.update({ id: prodAttr.prdctAtrbGid }, atrb, function(response){
        console.log('Updated Product Attribute');
      });        
    };
  }
]);
