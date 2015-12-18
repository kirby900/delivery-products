angular.module('app')
.controller('TaskDetailController', [
  '$scope', 
  '$state', 
  '$stateParams', 
  'selectedProduct', 
  'selectedTask', 
  'ProductTask',
  function($scope, $state, $stateParams, selectedProduct, selectedTask, ProductTask){
    console.log('State ' + $state.current.name);
    $scope.product = selectedProduct;
    $scope.task = selectedTask;

    $scope.delete = function(task){
      console.log('Entered delete()');

      ProductTask.delete({ id: task.taskGid }, function(response){
        console.log('Deleted Product Task');
        $state.go('products.selected.tasks.list', {
          productId: $stateParams.productId
        });
      });
    };
  }
]);
