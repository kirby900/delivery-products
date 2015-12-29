angular.module('app')
.controller('FormatDetailController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'selectedFormat', 'sortAttributes',
  function($scope, $state, $stateParams, selectedProduct, selectedFormat, sortAttributes){
    console.log('State ' + $state.current.name);
    $scope.product = selectedProduct;
    $scope.format = selectedFormat;

    console.log('Count of sort attributes: ' + sortAttributes.length);
    $scope.sortAttributes = sortAttributes;
  }
]);
