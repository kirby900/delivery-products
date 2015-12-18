angular.module('app')
.controller('TaskOrderController', [
    '$scope', 
    '$stateParams', 
    '$state', 
    'selectedProduct', 
    'tasks', 
    'ProductTask', 
    'user', 
    function($scope, $stateParams, $state, selectedProduct, tasks, ProductTask, user) {
    console.log('Entered TaskOrderController');

    $scope.product = selectedProduct;

    tasks.sort(function(a, b){
        return a.taskSeqNbr - b.taskSeqNbr;
    });

    $scope.tasks = tasks;

    $scope.changed = false;

    $scope.sortableOptions = {
        // revert controls animation of a dragged element's movement to its proper position.
        // If false, no animation.
        // If true, uses default animation interval.
        // If integer, animates over specified number of milliseconds
        revert: 300,
        update: function(event, ui) {
            console.log('Element moved');
            $scope.changed = true;
        }
    };

    $scope.save = function(reorderedTasks){
        console.log('Entered save()');

        var items = reorderedTasks.map(function(task, idx){
            return {
                taskGid: task.taskGid,
                taskSeqNbr: (idx + 1),
                lstUpdtId: user.id
            };
        });

        ProductTask.updateMultiple(items, function(response){
            console.log('updateMultiple success');
            $state.go('products.selected.tasks.list', {
                productId: $stateParams.productId
            });
        }, function(response){
            console.log('updateMultiple failure: ');
            console.log(response);
        });
    };
}
]);
