angular.module('app')
.controller('FormatNewController', [
  '$scope', '$state', '$stateParams', 'selectedProduct', 'ProductFormat', 'user',
  function($scope, $state, $stateParams, selectedProduct, ProductFormat, user){
    console.log('State products.selected.formats.new');

    $scope.product = selectedProduct;

    $scope.format = {
      entrpPrdctGid: selectedProduct.entrpPrdctGid,
      fileExtTxt: '.dat',
      fileTypCde: 'VARIABLE',
      fldSeparatorVal: '|',
      fileRqrdInd: 'N',
      fileCmprsNam: 'none',
      gnrtHdrInd: 'N',
      applyFactActvyFltrInd: 'N',
      allowEmptyFileInd: 'N',
      applyDstctClusInd: 'N',
      lineEndngCde: 'LF',
      lstUpdtId: user.id
    };

    $scope.save = function(format){
      console.log('Entered save');

      ProductFormat.save(format, function(response){
        console.log('Saved Product Format');
        $state.go('products.selected.formats.list', {
          productId: $stateParams.productId
        });
      });
    };
  }
]);
