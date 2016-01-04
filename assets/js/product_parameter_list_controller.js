angular.module('app')
.controller('ProductParameterListController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'productParameters', 'ProductParameter',
  function($scope, $state, $stateParams, selectedProduct, productParameters, ProductParameter){
    console.log('State ' + $state.current.name);

    $scope.product = selectedProduct;
    $scope.productParameters = productParameters;

    $scope.sortOptions = {
      key: 'parmNam',
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
