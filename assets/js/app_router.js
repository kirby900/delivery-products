
angular.module('app')
.config(function($stateProvider, $urlRouterProvider, $breadcrumbProvider){

    $breadcrumbProvider.setOptions({
      //prefixStateName: 'home'
      includeAbstract: false
    });

  // Default URL if unmatched URL
  $urlRouterProvider.otherwise("/home");

  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: 'HomeController',
      ncyBreadcrumb: {
        label: 'Home'
      }
    })

    .state('parameters', {
      abstract: true,
      url: "/parameters",
      template: '<ui-view/>'
    })

    .state('parameters.list', {
      url: "/list",
      templateUrl: "templates/parameter_list.html",
      controller: 'ParameterListController',
      resolve: {
        parameters: function(Parameter){
          return Parameter.query().$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Parameters'
      }
    })

    .state('parameters.new', {
      url: "/new",
      templateUrl: "templates/parameter_new.html",
      controller: 'ParameterNewController',
      ncyBreadcrumb: {
        label: 'New',
        parent: 'parameters.list'
      }
    })

    .state('parameters.selected', {
      abstract: true,
      url: "/{parameterId}",
      template: '<ui-view/>',
      //controller: function($state){ console.log('State ' + $state.current.name); },
      resolve: {
        selectedParameter: function($stateParams, Parameter){
          return Parameter.get({ id: $stateParams.parameterId }).$promise;
        }
      }
    })

    .state('parameters.selected.detail', {
      url: "/detail",
      templateUrl: "templates/parameter_detail.html",
      controller: 'ParameterDetailController',
      resolve: {
        productParameters: function($stateParams, ProductParameter){
          return ProductParameter.query({ parmGid: $stateParams.parameterId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: '{{ parameter.parmNam }}',
        parent: 'parameters.list'
      }
    })

    .state('parameters.selected.edit', {
      url: "/edit",
      templateUrl: "templates/parameter_edit.html",
      controller: 'ParameterEditController',
      ncyBreadcrumb: {
        label: 'Edit',
        parent: 'parameters.selected.detail'
      }
    })

    .state('products', {
      abstract: true,
      url: "/products",
      template: '<ui-view/>'
    })

    .state('products.list', {
      url: "/list",
      templateUrl: "templates/enterprise_product_list.html",
      controller: 'EnterpriseProductListController',
      resolve: {
        enterpriseProducts: function(EnterpriseProduct){
          return EnterpriseProduct.query().$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Products'
      }
    })

    .state('products.new', {
      url: "/new",
      templateUrl: "templates/enterprise_product_new.html",
      controller: 'EnterpriseProductNewController',
      ncyBreadcrumb: {
        label: 'Add Product',
        parent: 'products.list'
      }
    })

    .state('products.selected', {
      abstract: true,
      url: "/{productId}",
      template: '<ui-view/>',
      //controller: function($scope, $state, $stateParams){ console.log('State ' + $state.current.name); },
      resolve: {
        selectedProduct: function($stateParams, EnterpriseProduct){
          return EnterpriseProduct.get({ id: $stateParams.productId }).$promise;
        }
      }
    })

    .state('products.selected.detail', {
      url: "/detail",
      templateUrl: "templates/enterprise_product_detail.html",
      controller: 'EnterpriseProductDetailController',
      ncyBreadcrumb: {
        label: '{{ product.entrpPrdctNam }}',
        parent: 'products.list'
      }
    })

    .state('products.selected.edit', {
      url: "/edit",
      templateUrl: "templates/enterprise_product_edit.html",
      controller: 'EnterpriseProductEditController',
      ncyBreadcrumb: {
        label: 'Edit',
        parent: 'products.selected.detail'
      }
    })

    .state('products.selected.parameters', {
      abstract: true,
      url: "/parameters",
      template: '<ui-view/>'
    })

    .state('products.selected.parameters.list', {
      url: "/list",
      templateUrl: "templates/product_parameter_list.html",
      controller: 'ProductParameterListController',
      resolve: {
        productParameters: function($stateParams, ProductParameter){
          return ProductParameter.query({ entrpPrdctGid: $stateParams.productId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Parameters',
        parent: 'products.selected.detail'
      }
    })

    .state('products.selected.parameters.new', {
      url: "/new",
      templateUrl: "templates/product_parameter_new.html",
      controller: 'ProductParameterNewController',
      resolve: {
        parameters: function($stateParams, Parameter){
          return Parameter.query().$promise;
        },
        usedParameters: function($stateParams, ProductParameter){
          return ProductParameter.query({ entrpPrdctGid: $stateParams.productId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'New',
        parent: 'products.selected.parameters.list'
      }
    })

    .state('products.selected.parameters.selected', {
      abstract: true,
      url: "/{productParmId}",
      template: '<ui-view/>',
      //controller: function($state){ console.log('State ' + $state.current.name); },
      resolve: {
        selectedProductParm: function($stateParams, ProductParameter){
          return ProductParameter.get({ id: $stateParams.productParmId }).$promise;
        }
      }
    })

    .state('products.selected.parameters.selected.detail', {
      url: "/detail",
      templateUrl: "templates/product_parameter_detail.html",
      controller: 'ProductParameterDetailController',
      ncyBreadcrumb: {
        label: '{{ productParameter.parameter.parmNam }}',
        parent: 'products.selected.parameters.list'
      }
    })

    .state('products.selected.parameters.selected.edit', {
      url: "/edit",
      templateUrl: "templates/product_parameter_edit.html",
      controller: 'ProductParameterEditController',
      resolve: {
        parameters: function(Parameter){
          return Parameter.query().$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Edit',
        parent: 'products.selected.parameters.selected.detail'
      }
    })

    .state('products.selected.formats', {
      abstract: true,
      url: "/formats",
      template: '<ui-view/>'
    })

    .state('products.selected.formats.list', {
      url: "/list",
      templateUrl: "templates/product_format_list.html",
      controller: 'FormatListController',
      resolve: {
        formats: function($stateParams, ProductFormat){
          console.log('Entered resolve formats in state products.selected.formats.list');
          return ProductFormat.query({ entrpPrdctGid: $stateParams.productId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Formats',
        parent: 'products.selected.detail'
      }
    })

    .state('products.selected.formats.reorder', {
      url: "/reorder",
      templateUrl: "templates/product_format_reorder.html",
      controller: 'FormatOrderController',
      resolve: {
        formats: function($stateParams, ProductFormat){
          console.log('Entered resolve formats in state products.selected.formats.reorder')
          return ProductFormat.query({ entrpPrdctGid: $stateParams.productId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Arrange',
        parent: 'products.selected.formats.list'
      }
    })

    .state('products.selected.formats.new', {
      url: "/new",
      templateUrl: "templates/product_format_new.html",
      controller: 'FormatNewController',
      ncyBreadcrumb: {
        label: 'New',
        parent: 'products.selected.formats.list'
      }
    })

    .state('products.selected.formats.selected', {
      abstract: true,
      url: "/{formatId}",
      template: "<ui-view/>",
      //controller: function($state){ console.log('State ' + $state.current.name); },
      resolve: {
        selectedFormat: function($stateParams, ProductFormat){
          return ProductFormat.get({ id: $stateParams.formatId }).$promise;
        }
      }
    })

    .state('products.selected.formats.selected.detail', {
      url: "/detail",
      templateUrl: "templates/product_format_detail.html",
      controller: 'FormatDetailController',
      resolve: {
        sortAttributes: function($stateParams, ProductAttribute){
          return ProductAttribute.recordSortAttributes({ prdctFrmtGid: $stateParams.formatId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: '{{ format.prdctFrmtNam }}',
        parent: 'products.selected.formats.list'
      }
    })

    .state('products.selected.formats.selected.detail.recordSort', {
      //url: "/detail",
      templateUrl: "templates/product_format_record_sort_fields.html",
      controller: 'FormatRecordSortController',
      resolve: {
        sortAttributes: function($stateParams, ProductAttribute){
          return ProductAttribute.query({
            prdctFrmtGid: $stateParams.formatId, 
            ordrByRankNbr: {'>': 0} 
          }).$promise;
        }
      }
    })

    .state('products.selected.formats.selected.edit', {
      url: "/edit",
      templateUrl: "templates/product_format_edit.html",
      controller: 'FormatEditController',
      ncyBreadcrumb: {
        label: 'Edit',
        parent: 'products.selected.formats.selected.detail'
      }
    })

    .state('products.selected.formats.selected.displayconditions', {
      url: "/displayConditions",
      templateUrl: "templates/product_format_display_conditions.html",
      controller: 'FormatDisplayConditionsController',
      resolve: {
        productFormatParameterVals: function($stateParams, ProductFormatParameterVal){
          return ProductFormatParameterVal.query({ prdctFrmtGid: $stateParams.formatId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Display Settings',
        parent: 'products.selected.formats.selected.detail'
      }
    })

    .state('products.selected.formats.selected.attributes', {
      abstract: true,
      url: "/attributes",
      template: '<ui-view/>',
      ncyBreadcrumb: {
        //label: 'Attributes'
      }
    })

    .state('products.selected.formats.selected.attributes.list', {
      url: "/list",
      templateUrl: "templates/product_attribute_list.html",
      controller: 'AttributeListController',
      resolve: {
        productAttributes: function($stateParams, ProductAttribute){
          return ProductAttribute.query({ prdctFrmtGid: $stateParams.formatId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Attributes',
        parent: 'products.selected.formats.selected.detail'
      }
    })

    .state('products.selected.formats.selected.attributes.reorder', {
      url: "/reorder",
      templateUrl: "templates/product_attribute_reorder.html",
      controller: 'AttributeOrderController',
      resolve: {
        productAttributes: function($stateParams, ProductAttribute){
          return ProductAttribute.query({ prdctFrmtGid: $stateParams.formatId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Arrange',
        parent: 'products.selected.formats.selected.attributes.list'
      }
    })

    .state('products.selected.formats.selected.attributes.new', {
      url: "/new",
      templateUrl: "templates/product_attribute_new.html",
      controller: 'AttributeNewController',
      resolve: {
        aggregateFunctions: function(AggregateFunction){
          return AggregateFunction.query().$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'New',
        parent: 'products.selected.formats.selected.attributes.list'
      }
    })

    .state('products.selected.formats.selected.attributes.selected', {
      abstract: true,
      url: "/{attributeId}",
      template: '<ui-view/>',
      //controller: function($state){ console.log('State ' + $state.current.name); },
      resolve: {
        selectedAttribute: function($stateParams, ProductAttribute){
          return ProductAttribute.get({ id: $stateParams.attributeId }).$promise;
        }
      },
      ncyBreadcrumb: {
        //label: 'Selected Attribute'
      }
    })

    .state('products.selected.formats.selected.attributes.selected.detail', {
      url: "/detail",
      templateUrl: "templates/product_attribute_detail.html",
      controller: 'AttributeDetailController',
      ncyBreadcrumb: {
        label: '{{ attribute.atrbNam }}',
        parent: 'products.selected.formats.selected.attributes.list'
      }
    })

    .state('products.selected.formats.selected.attributes.selected.edit', {
      url: "/edit",
      templateUrl: "templates/product_attribute_edit.html",
      controller: 'AttributeEditController',
      resolve: {
        aggregateFunctions: function(AggregateFunction){
          return AggregateFunction.query().$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Edit',
        parent: 'products.selected.formats.selected.attributes.selected.detail'
      }
    })

    .state('products.selected.tasks', {
      abstract: true,
      url: "/tasks",
      template: '<ui-view/>',
      ncyBreadcrumb: {
        //label: 'Tasks'
      }
    })

    .state('products.selected.tasks.list', {
      url: "/list",
      templateUrl: "templates/product_task_list.html",
      controller: 'ProductTaskListController',
      resolve: {
        tasks: function($stateParams, ProductTask){
          return ProductTask.query({ entrpPrdctGid: $stateParams.productId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Tasks',
        parent: 'products.selected.detail'
      }
    })

    .state('products.selected.tasks.reorder', {
      url: "/reorder",
      templateUrl: "templates/product_task_reorder.html",
      controller: 'TaskOrderController',
      resolve: {
        tasks: function($stateParams, ProductTask){
          console.log('Entered resolve tasks in state products.selected.tasks.reorder')
          return ProductTask.query({ entrpPrdctGid: $stateParams.productId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Arrange',
        parent: 'products.selected.tasks.list'
      }
    })

    .state('products.selected.tasks.new', {
      url: "/new",
      templateUrl: "templates/product_task_new.html",
      controller: 'TaskNewController',
      ncyBreadcrumb: {
        label: 'New',
        parent: 'products.selected.tasks.list'
      },
      resolve: {
        taskTypes: function(TaskType){
          return TaskType.query().$promise;
        },
        formats: function($stateParams, ProductFormat){
          return ProductFormat.query({ entrpPrdctGid: $stateParams.productId }).$promise;
        }
      }
    })

    .state('products.selected.tasks.selected', {
      abstract: true,
      url: "/{taskId}",
      template: '<ui-view/>',
      //controller: function($state){ console.log('State ' + $state.current.name); },
      resolve: {
        selectedTask: function($stateParams, ProductTask){
          return ProductTask.get({ id: $stateParams.taskId }).$promise;
        }
      },
      ncyBreadcrumb: {
        //label: 'Selected Task'
      }
    })

    .state('products.selected.tasks.selected.detail', {
      url: "/detail",
      templateUrl: "templates/product_task_detail.html",
      controller: 'TaskDetailController',
      ncyBreadcrumb: {
        label: '{{ task.taskNam }}',
        parent: 'products.selected.tasks.list'
      }
    })

    .state('products.selected.tasks.selected.edit', {
      url: "/edit",
      templateUrl: "templates/product_task_edit.html",
      controller: 'TaskEditController',
      resolve: {
        taskTypes: function(TaskType){
          return TaskType.query().$promise;
        },
        formats: function($stateParams, ProductFormat){
          return ProductFormat.query({ entrpPrdctGid: $stateParams.productId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Edit',
        parent: 'products.selected.tasks.selected.detail'
      }
    })

    .state('notFound', {
      url: "/{path:.*}",
      templateUrl: "templates/not-found.html",
      //controller: function($state){ console.log('State ' + $state.current.name); },
      ncyBreadcrumb: {
        label: 'Not found'
      }
    });

});
