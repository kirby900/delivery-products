
angular.module('productEditorApp',['ui.router', 'ncy-angular-breadcrumb', 'ProductDataService', 'ui.sortable'])
.value('user', {
  id: "",
  name: ""
})
.config(function($stateProvider, $urlRouterProvider, $breadcrumbProvider){

    $breadcrumbProvider.setOptions({
      //template: 'bootstrap2',
      includeAbstract: true,
      prefixStateName: 'home'
    });

  // Default URL if unmatched URL
  $urlRouterProvider.otherwise("/home");

  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "templates/home.html",
      ncyBreadcrumb: {
        label: 'Home'
      },
      controller: function($state){
        console.log('State ' + $state.current.name);
      }
    })
    .state('products', {
      abstract: true,
      url: "/products",
      template: "<ui-view/>",
      ncyBreadcrumb: {
        //label: 'Products (abstract)',
      }
    })
    .state('products.list', {
      url: "/list",
      templateUrl: "templates/product_list.html",
      ncyBreadcrumb: {
        label: 'Products'
      },
      controller: function($scope, $state, EnterpriseProduct){
        console.log('State ' + $state.current.name);

        // query() method immediately returns an array that will be
        // populated once database call finishes.
        $scope.products = EnterpriseProduct.query();
      }
    })
    .state('products.new', {
      url: "/new",
      templateUrl: "templates/product_new.html",
      ncyBreadcrumb: {
        label: 'New Product',
        parent: 'products.list'
      },
      controller: function($scope, $state, EnterpriseProduct, user) {
        console.log('State ' + $state.current.name);

        $scope.product = {
          aprvdInd: 'N',
          trgtPerlDrvrNam: 'Oracle',
          lstUpdtId: user.id
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
    .state('products.selected', {
      abstract: true,
      url: "/{productId}",
      template: "<ui-view/>",
      resolve: {
        selectedProduct: function($stateParams, EnterpriseProduct){
          return EnterpriseProduct.get({ id: $stateParams.productId }).$promise;
        }
      },
      ncyBreadcrumb: {
        //label: 'Product (abstract)'
        //label: 'Product ' + $stateParams.productId
      }
    })
    .state('products.selected.detail', {
      url: "/detail",
      templateUrl: "templates/product_detail.html",
      ncyBreadcrumb: {
        //label: 'Product ' + $stateParams.productId
        label: '{{product.entrpPrdctNam}} Detail',
        parent: 'products.list'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, EnterpriseProduct){
        console.log('State ' + $state.current.name);

        //$scope.product = EnterpriseProduct.get({ id: $stateParams.productId });
        $scope.product = selectedProduct;

        $scope.delete = function(p){
          EnterpriseProduct.delete({ id: p.entrpPrdctGid }, function(response){
              console.log('Deleted Enterprise Product');
              $state.go('products.list');
          });
        };
      }
    })
    .state('products.selected.edit', {
      url: "/edit",
      templateUrl: "templates/product_edit.html",
      ncyBreadcrumb: {
        label: 'Edit'
      },
      controller: function($scope, $state, $stateParams, EnterpriseProduct){
        console.log('State ' + $state.current.name);

        $scope.crumbs = [
          { url: '#/products', label: 'Products' },
          { url: '#/products/' + parseInt($stateParams.productId, 10), label: $stateParams.productId },
          { url: '#/products/' + parseInt($stateParams.productId, 10) + '/edit', label: 'Edit' }
        ];

        $scope.product = EnterpriseProduct.get({ id: $stateParams.productId });

        $scope.isModified = function(){
          return dirty;
        };
        
        $scope.update = function(p){
          EnterpriseProduct.update({ id: p.entrpPrdctGid }, p, function(response){
            console.log('Updated Enterprise Product');
            $state.go('products.list');
          });
        };
      }
    })
    .state('products.selected.parameters', {
      abstract: true,
      url: "/parameters",
      template: "<ui-view/>",
      ncyBreadcrumb: {
        //label: 'Parameters'
      }
    })
    .state('products.selected.parameters.list', {
      url: "/list",
      templateUrl: "templates/product_parameter_list.html",
      ncyBreadcrumb: {
        label: 'Parameter List'
      },
      controller: function($scope, $state, $stateParams, ProductParameter){
        console.log('State ' + $state.current.name);

        $scope.crumbs = [
          { url: '#/products', label: 'Products' },
          { url: '#/products/' + parseInt($stateParams.productId, 10), label: $stateParams.productId },
          { url: '#/products/' + parseInt($stateParams.productId, 10) + '/parameters', label: 'Parameters' }
        ];

        $scope.entrpPrdctGid = $stateParams.productId;
        $scope.productParameters = ProductParameter.query({
          entrpPrdctGid: $stateParams.productId 
        });
      }
    })
    .state('products.selected.parameters.new', {
      url: "/new",
      templateUrl: "templates/product_parameter_new.html",
      ncyBreadcrumb: {
        label: 'New Product Parameter'
      },
      controller: function($scope, $state, $stateParams, Parameter, ProductParameter, user) {
        console.log('State ' + $state.current.name);

        $scope.crumbs = [
          { url: '#/products', label: 'Products' },
          { url: '#/products/' + parseInt($stateParams.productId, 10), label: $stateParams.productId },
          { url: '#/products/' + parseInt($stateParams.productId, 10) + '/parameters', label: 'Parameters'},
          { url: '#/products/' + parseInt($stateParams.productId, 10) + '/parameters/new', label: 'New' }
        ];

        // Get list of available parameters
        $scope.parameters = Parameter.query();

        $scope.productParameter = {
          entrpPrdctGid: $stateParams.productId,
          minOcrncNbr: 0,
          maxOcrncNbr: 99,
          clctdParmInd: 'N',
          lstUpdtId: user.id
        };

        $scope.save = function(p){
          console.log('Entered save()');
          ProductParameter.save(p, function(response){
            console.log('Saved Product Parameter');
            $state.go('products.selected.parameters', { 
              entrpPrdctGid: p.entrpPrdctGid 
            });            
          });
        };
      }
    })
    .state('products.selected.formats', {
      abstract: true,
      url: "/formats",
      template: "<ui-view/>",
      ncyBreadcrumb: {
        //label: 'Formats'
      }
    })
    .state('products.selected.formats.list', {
      url: "/list",
      templateUrl: "templates/product_format_list.html",
      ncyBreadcrumb: {
        label: 'Format List'
      },
      controller: function($scope, $state, $stateParams, ProductFormat){
        console.log('State ' + $state.current.name);

        $scope.sortableOptions = {
          //containment: 'window',
          axis: 'y',
          update: function(event, ui){
            console.log('Entered update function');
          }
        };

        $scope.entrpPrdctGid = $stateParams.productId;
        $scope.formats = ProductFormat.query({
          entrpPrdctGid: $stateParams.productId
        });
      }
    })
    .state('products.selected.formats.selected', {
      abstract: true,
      url: "/{formatId}",
      template: "<ui-view/>",
      ncyBreadcrumb: {
        //label: 'Attributes'
      }
    })
    .state('products.selected.formats.selected.edit', {
      url: "/edit",
      templateUrl: "templates/product_format_edit.html",
      ncyBreadcrumb: {
        label: 'Edit Format'
      },
      controller: function($scope, $state, $stateParams, ProductFormat){
        console.log('State ' + $state.current.name);

        $scope.entrpPrdctGid = $stateParams.productId;
        $scope.format = ProductFormat.get({
          id: $stateParams.formatId
        });

        $scope.save = function(fmt){
          console.log('Entered save()');
          console.log('NOT YET IMPLEMENTED');
        };
      }
    })
    .state('products.selected.formats.selected.attributes', {
      abstract: true,
      url: "/attributes",
      template: "<ui-view/>",
      ncyBreadcrumb: {
        //label: 'Attributes'
      }
    })
    .state('products.selected.formats.selected.attributes.list', {
      url: "/list",
      templateUrl: "templates/product_attribute_list.html",
      ncyBreadcrumb: {
        label: 'Attribute List'
        //parent: ???
      },
      controller: function($scope, $state, $stateParams, ProductAttribute){
        console.log('State ' + $state.current.name);

        $scope.sortableOptions = {
          //containment: 'window',
          //axis: 'y',
          update: function(event, ui){
            console.log('Entered update function');
          }
        };

        $scope.entrpPrdctGid = $stateParams.productId;
        $scope.prdctFrmtGid = $stateParams.formatId;

        $scope.attributes = [];

        // $scope.attributes = ProductAttribute.query({
        //   prdctFrmtGid: $stateParams.prdctFrmtGid
        // });
        ProductAttribute.query({
          prdctFrmtGid: $stateParams.formatId
        }, function(data){
          console.log('Entered success callback of ProductAttribute query');
          data.sort(function(a, b){
            return a.atrbOrdrNbr - b.atrbOrdrNbr;
          });

          $scope.attributes = data;
        });
      }
    })
    .state('products.selected.formats.selected.attributes.selected', {
      abstract: true,
      url: "/{attributeId}",
      template: "<ui-view/>",
      ncyBreadcrumb: {
        //label: 'Selected Attribute'
      }
    })
    .state('products.selected.formats.selected.attributes.selected.detail', {
      url: "/detail",
      templateUrl: "templates/product_attribute_detail.html",
      ncyBreadcrumb: {
        label: 'Attribute Detail'
      },
      controller: function($scope, $state, $stateParams, ProductAttribute){
        console.log('State ' + $state.current.name);

        $scope.selections.entrpPrdctGid = $stateParams.productId;
        $scope.selections.prdctFrmtGid = $stateParams.formatId;
        $scope.selections.prdctAtrbGid = $stateParams.attributeId;
        
        $scope.attribute = ProductAttribute.get({ 
          id: $stateParams.attributeId 
        });

        $scope.delete = function(attr){
          ProductAttribute.delete({ id: attr.prdctAtrbGid }, function(response){
              console.log('Deleted Product Attribute');
              $state.go('products.selected.formats.selected.attributes.list', {
                productId: $stateParams.productId,
                formatId: $stateParams.formatId
              });
          });
        };
      }
    })
    .state('products.selected.tasks', {
      abstract: true,
      url: "/tasks",
      template: "<ui-view/>",
      ncyBreadcrumb: {
        //label: 'Tasks'
      }
    })
    .state('products.selected.tasks.list', {
      url: "/list",
      templateUrl: "templates/product_task_list.html",
      ncyBreadcrumb: {
        label: 'Task List'
      },
      controller: function($scope, $state, $stateParams, ProductTask){
        console.log('State ' + $state.current.name);

        $scope.entrpPrdctGid = $stateParams.productId;
        $scope.tasks = [];

        // Get tasks for selected product
        // Sort them by sequence number
        ProductTask.query({
          entrpPrdctGid: $stateParams.productId 
        }, function(data){
          data.sort(function(a, b){ return a.taskSeqNbr - b.taskSeqNbr; });
          $scope.tasks = data;
        });
      }
    })
    .state('products.selected.tasks.selected', {
      abstract: true,
      url: "/{taskId}",
      template: "<ui-view/>",
      ncyBreadcrumb: {
        //label: 'Selected Task'
      }
    })
    .state('products.selected.tasks.selected.detail', {
      url: "/detail",
      templateUrl: "templates/product_task_detail.html",
      ncyBreadcrumb: {
        label: 'Task Detail'
      },
      controller: function($scope, $state, $stateParams, ProductTask){
        console.log('State ' + $state.current.name);

        $scope.entrpPrdctGid = $stateParams.productId;
        $scope.task = ProductTask.get({
          id: $stateParams.taskId 
        });
      }
    });

})
.controller('ProductEditorController', ['$scope', function($scope){
  console.log('Entered ProductEditorController');

  $scope.selections = {};

  $scope.indicatorToText = function(ind){
    return ind == "Y" ? 'Yes' : 'No';
  };
}])
.run(function(user){
  // TODO: fetch real user identity
  user.id = 'ip2150';
  user.name = 'Dean Holbrook';
});
