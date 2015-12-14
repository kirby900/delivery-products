angular.module('app')
.controller('FormatOrderController', [
    '$scope', 
    '$stateParams', 
    '$state', 
    'selectedProduct', 
    'formats', 
    'ProductFormat', 
    'user', 
    function($scope, $stateParams, $state, selectedProduct, formats, ProductFormat, user) {
    console.log('Entered FormatOrderController');

    $scope.product = selectedProduct;

    formats.sort(function(a, b){
        return a.dsplyOrdrNbr - b.dsplyOrdrNbr;
    });

    $scope.formats = formats;

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

    $scope.save = function(reorderedFormats){
        console.log('Entered save()');

        var items = reorderedFormats.map(function(format, idx){
            return {
                prdctFrmtGid: format.prdctFrmtGid,
                dsplyOrdrNbr: (idx + 1),
                lstUpdtId: user.id
            };
        });

        ProductFormat.updateMultiple(items, function(response){
            console.log('updateMultiple success');
            $state.go('products.selected.formats.list', {
                productId: $stateParams.productId
            });
        }, function(response){
            console.log('updateMultiple failure: ');
            console.log(response);
        });
    };
}
]);
