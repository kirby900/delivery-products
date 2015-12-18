angular.module('app')
.controller('TaskNewController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'taskTypes', 'formats', 'ProductTask', 'user',
  function($scope, $state, $stateParams, selectedProduct, taskTypes, formats, ProductTask, user){
    console.log('State ' + $state.current.name);

    $scope.product = selectedProduct;
    $scope.taskTypes = taskTypes;
    $scope.formats = formats;

    $scope.task = {
      entrpPrdctGid: selectedProduct.entrpPrdctGid,
      taskTypCde: 'EXEC_PROC',
      crteTrgtTblInd: 'N',
      trgtTrnctInd: 'N',
      prepPrtnInd: 'N',
      lstUpdtId: user.id
    };

    $scope.save = function(task){
      console.log('Entered save()');

      ProductTask.save( task, function(response){
        console.log('Saved Product Task');
        $state.go('products.selected.tasks.list', {
          productId: $stateParams.productId
        });
      });
    };
  }
]);
