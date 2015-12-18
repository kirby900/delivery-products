angular.module('app')
.controller('EnterpriseProductNewController', [
  '$scope', '$state', 'EnterpriseProduct', 'user',
  function($scope, $state, EnterpriseProduct, user) {
    console.log('State ' + $state.current.name);

    $scope.product = {
      aprvdInd: 'N',
      trgtPerlDrvrNam: 'Oracle'
    };

    $scope.save = function(product){
      console.log('Entered save()');
      product.lstUpdtId = user.id;

      EnterpriseProduct.save(product, function(response){
        console.log('Saved Enterprise Product');
        $state.go('products.list');
      });
    };
  }
]);
