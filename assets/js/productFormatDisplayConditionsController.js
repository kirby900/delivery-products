angular.module('app')
.controller('ProductFormatDisplayConditionsController', [
    '$scope', 
    '$stateParams', 
    '$state', 
    'selectedProduct', 
    'selectedFormat', 
    'productFormatParameterVals', 
    function($scope, $stateParams, $state, selectedProduct, selectedFormat, productFormatParameterVals){
        console.log('Entered ProductFormatDisplayConditionsController');

        $scope.product = selectedProduct;
        $scope.format = selectedFormat;
        $scope.formatParameterValues = productFormatParameterVals;
    }]);
