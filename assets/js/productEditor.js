
angular.module('productEditorApp',['ui.router', 'ProductLayerModule'])
.config(function($stateProvider, $urlRouterProvider){

  // Default URL if unmatched URL
  $urlRouterProvider.otherwise("/products/list");

  // Now set up the states
  $stateProvider
    .state('products', {
      abstract: true,
      url: "/products",
      template: "<ui-view/>"
    })
    .state('products.list', {
      url: "/list",
      templateUrl: "templates/product_list.html",
      controller: function($scope, EnterpriseProduct){
        console.log('Entered controller for products.list state');

        // query() method immediately returns an array that will be
        // populated once database call finishes.
        $scope.products = EnterpriseProduct.query();
      }
    })
    .state('products.detail', {
      url: "/:id/detail",
      templateUrl: "templates/product_detail.html",
      controller: function($scope, $stateParams, EnterpriseProduct, $state){
        console.log('Entered controller for products.detail state');
        
        $scope.product = EnterpriseProduct.get({ id: $stateParams.id });

        $scope.delete = function(p){
          EnterpriseProduct.delete({ id: p.entrpPrdctGid }, function(response){
              console.log('Deleted Enterprise Product');
              $state.go('products.list');
          });
        };
      }
    })
    .state('products.edit', {
      url: "/:id/edit",
      templateUrl: "templates/product_edit.html",
      controller: function($scope, $stateParams, EnterpriseProduct, $state){
        console.log('Entered controller for products.single.edit state');

        $scope.product = EnterpriseProduct.get({ id: $stateParams.id });

        $scope.update = function(p){
          EnterpriseProduct.update({ id: p.entrpPrdctGid }, p, function(response){
            console.log('Updated Enterprise Product');
            $state.go('products.list');
          });
        };
      }
    })
    .state('products.new', {
      url: "/new",
      templateUrl: "templates/product_new.html",
      controller: function($scope, $state, EnterpriseProduct) {
        console.log('Entered controller for products.new state');

        $scope.product = {
          aprvdInd: 'N',
          trgtPerlDrvrNam: 'Oracle',
          lstUpdtId: $scope.userId
        };

        $scope.save = function(p){
          console.log('Entered save()');
          EnterpriseProduct.save(p, function(response){
            console.log('Saved Enterprise Product');
            $state.go('products.list');
          });
        };
      }
    })
    .state('productParameters', {
      url: "/products/:entrpPrdctGid/parameters",
      templateUrl: "templates/product_parameter_list.html",
      controller: function($scope, $stateParams, ProductParameter){
        console.log('Entered controller for state "productParameters"');
        $scope.entrpPrdctGid = $stateParams.entrpPrdctGid;
        $scope.productParameters = ProductParameter.query({
          entrpPrdctGid: $stateParams.entrpPrdctGid 
        });
      }
    })
    .state('productParametersNew', {
      url: "/products/:entrpPrdctGid/parameters/new",
      templateUrl: "templates/product_parameter_new.html",
      controller: function($scope, $stateParams, Parameter, ProductParameter, $state) {
        console.log('Entered controller for state "productParameterNew"');
        // Get list of available parameters
        $scope.parameters = Parameter.query();

        $scope.productParameter = {
          entrpPrdctGid: $stateParams.entrpPrdctGid,
          minOcrncNbr: 0,
          maxOcrncNbr: 99,
          clctdParmInd: 'N',
          lstUpdtId: $scope.userId
        };

        $scope.save = function(p){
          console.log('Entered save()');
          ProductParameter.save(p, function(response){
            console.log('Saved Product Parameter');
            $state.go('productParameters', { 
              entrpPrdctGid: p.entrpPrdctGid 
            });            
          });
        };
      }
    })
    ;
})
.controller('ProductEditorController', ['$scope', function($scope){
  console.log('Entered ProductEditorController');
  $scope.userId = 'ip2150';
}]);
