angular.module('app')
.controller('FormatEditController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'selectedFormat', 'ProductFormat', 'user',
  function($scope, $state, $stateParams, selectedProduct, selectedFormat, ProductFormat, user){
    console.log('State ' + $state.current.name);

    $scope.product = selectedProduct;
    $scope.format = selectedFormat;

    $scope.save = function(format){
      console.log('Entered save()');
      format.lstUpdtId = user.id;

      ProductFormat.update({ id: format.prdctFrmtGid }, format, function(response){
        console.log('Updated Product Format');
        $state.go('products.selected.formats.list', {
          productId: $stateParams.productId
        });
      });
    };
  }
]);
