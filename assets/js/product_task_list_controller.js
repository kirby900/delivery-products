angular.module('app')
.controller('ProductTaskListController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'tasks',
  function($scope, $state, $stateParams, selectedProduct, tasks){
    console.log('State ' + $state.current.name);

    $scope.product = selectedProduct;
    $scope.tasks = tasks;

    $scope.sortOptions = {
      key: 'taskSeqNbr',
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
