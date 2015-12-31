angular.module('app')
.controller('ProductParameterListController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'productParameters', 'ProductParameter',
  function($scope, $state, $stateParams, selectedProduct, productParameters, ProductParameter){
    console.log('State ' + $state.current.name);

    $scope.product = selectedProduct;
    //$scope.productParameters = productParameters;

    $scope.promptedParameters = productParameters.filter(function(elem){ return elem.clctdParmInd === 'N' });
    $scope.calculatedParameters = productParameters.filter(function(elem){ return elem.clctdParmInd === 'Y' });
/*
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
*/

    $scope.promptedSort = {
      key: 'displayOrder',
      reverse: false
    };

    $scope.calculatedSort = {
      key: 'parmNam',
      reverse: false
    };

    $scope.sort = function(key, options){
      if ( key === options.key ){
        options.reverse = !options.reverse;
      } else {
        options.key = key;
        options.reverse = false;
      }
    };

  }
]);
