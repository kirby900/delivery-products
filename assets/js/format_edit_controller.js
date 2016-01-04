angular.module('app')
.controller('FormatEditController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'selectedFormat', 'ProductFormat', 'user',
  function($scope, $state, $stateParams, selectedProduct, selectedFormat, ProductFormat, user){
    console.log('State ' + $state.current.name);

    $scope.product = selectedProduct;
    $scope.format = angular.copy(selectedFormat);

    $scope.save = function(format){
      console.log('Entered save()');
      format.lstUpdtId = user.id;

      ProductFormat.update({ id: format.prdctFrmtGid }, format, function(data){
        console.log('Updated Product Format');
        angular.extend(selectedFormat, data);

        $state.go('products.selected.formats.selected.detail', {
          productId: $stateParams.productId,
          formatId: $stateParams.formatId
        });
      });
    };
  }
]);
