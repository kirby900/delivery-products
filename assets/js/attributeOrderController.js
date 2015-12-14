angular.module('app')
.controller('AttributeOrderController', ['$scope', '$stateParams', '$state', 'selectedProduct', 'selectedFormat', 'productAttributes', 'ProductAttribute', 'user', function($scope, $stateParams, $state, selectedProduct, selectedFormat, productAttributes, ProductAttribute, user){
    console.log('Entered AttributeOrderController');

    $scope.product = selectedProduct;
    $scope.format = selectedFormat;

    console.log( 'Before sort: ' + productAttributes.map(function(attr){ return attr.atrbOrdrNbr }).join(', ') );

    productAttributes.sort(function(a,b){
        return a.atrbOrdrNbr - b.atrbOrdrNbr;
    });

    console.log( 'After sort: ' + productAttributes.map(function(attr){ return attr.atrbOrdrNbr }).join(', ') );

    $scope.attributes = productAttributes;

    $scope.changed = false;

    $scope.sortableOptions = {
        // revert controls animation of a dragged element's movement to its proper position.
        // If false, no animation.
        // If true, uses default animation interval.
        // If integer, animates over specified number of milliseconds
        //revert: true,
        revert: 300,
        update: function(event, ui) {
            console.log('Update event');
            $scope.changed = true;
        }
    };

    $scope.save = function(attributes){
        console.log('Entered save()');

        var attrs = attributes.map(function(attr, idx){
            return {
                prdctAtrbGid: attr.prdctAtrbGid,
                atrbOrdrNbr: (idx + 1),
                lstUpdtId: user.id
            };
        });

        ProductAttribute.updateMultiple(attrs, function(response){
            console.log('updateMultiple success');
            $state.go('products.selected.formats.selected.attributes.list', {
                productId: $stateParams.productId,
                formatId: $stateParams.formatId
            });
        }, function(response){
            console.log('updateMultiple failure: ');
            console.log(response);
        });
    };
}]);
