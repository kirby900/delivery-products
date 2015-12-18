angular.module('app')
.controller('FormatDetailController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'selectedFormat',
  function($scope, $state, $stateParams, selectedProduct, selectedFormat){
    console.log('State ' + $state.current.name);
    $scope.product = selectedProduct;
    $scope.format = selectedFormat;
  }
]);
