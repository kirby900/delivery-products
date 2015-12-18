angular.module('app')
.controller('EnterpriseProductListController', [
  '$scope', '$state', 'enterpriseProducts', 'EnterpriseProduct',
  function($scope, $state, enterpriseProducts, EnterpriseProduct){
    console.log('State ' + $state.current.name);

    $scope.products = enterpriseProducts;

    $scope.sortOptions = {
      key: 'entrpPrdctNam',
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
