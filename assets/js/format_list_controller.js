angular.module('app')
.controller('FormatListController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'formats', 'ProductFormat',
  function($scope, $state, $stateParams, selectedProduct, formats, ProductFormat){
    console.log('State ' + $state.current.name);

    $scope.product = selectedProduct;        
    $scope.formats = formats;

    $scope.sortOptions = {
      key: 'dsplyOrdrNbr',
      reverse: false
    };

    $scope.sort = function(key){
      if ( key === $scope.sortOptions.key ){
        $scope.sortOptions.reverse = !$scope.sortOptions.reverse;
      } else {
        $scope.sortOptions.key = key;
        $scope.sortOptions.reverse = false;
      }
    };
  }
]);
