angular.module('app')
.controller('FormatDisplayConditionsController', [
    '$scope', 
    '$stateParams', 
    '$state', 
    'selectedProduct', 
    'selectedFormat', 
    'productFormatParameterVals', 
    function($scope, $stateParams, $state, selectedProduct, selectedFormat, productFormatParameterVals){
        console.log('Entered FormatDisplayConditionsController');

        $scope.product = selectedProduct;
        $scope.format = selectedFormat;
        $scope.formatParameterValues = productFormatParameterVals;
    }]);
