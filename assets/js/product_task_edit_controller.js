angular.module('app')
.controller('TaskEditController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'selectedTask', 'taskTypes', 'formats', 'ProductTask', 'user',
  function($scope, $state, $stateParams, selectedProduct, selectedTask, taskTypes, formats, ProductTask, user){
    console.log('State ' + $state.current.name);
    $scope.product = selectedProduct;
    $scope.taskTypes = taskTypes;
    $scope.formats = formats;
    $scope.task = angular.copy(selectedTask);

    $scope.save = function(task){
      console.log('Entered save()');
      task.lstUpdtId = user.id;

      ProductTask.update({id: task.taskGid}, task, function(data){
        console.log('Updated Product Task');
        angular.extend(selectedTask, data);
        
        $state.go('products.selected.tasks.selected.detail', {
          productId: $stateParams.productId,
          taskId: $stateParams.taskId
        });
      }, function(response){
        console.log('Update failed');
        console.log(response);
      });
    }
  }
]);
