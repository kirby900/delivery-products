
angular.module('productEditorApp',['ui.router', 'ncy-angular-breadcrumb', 'ProductDataService', 'ui.sortable', 'ngAnimate'])
.value('user', {
  id: "",
  name: ""
})
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
      template: '<ui-view/>'
    })

    .state('products.list', {
      url: "/list",
      templateUrl: "templates/product_list.html",
      ncyBreadcrumb: {
        //parent: 'home',
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
        label: 'Add Product',
        parent: 'products.list'
      },
      controller: function($scope, $state, EnterpriseProduct, user) {
        console.log('State ' + $state.current.name);

        $scope.product = {
          aprvdInd: 'N',
          trgtPerlDrvrNam: 'Oracle'
        };

        $scope.save = function(product){
          console.log('Entered save()');
          product.lstUpdtId = user.id;
          //product.lstUpdtTstmp = new Date();

          EnterpriseProduct.save(product, function(response){
            console.log('Saved Enterprise Product');
            $state.go('products.list');
          });
        };
      }
    })

    .state('products.selected', {
      abstract: true,
      url: "/{productId}",
      template: '<ui-view/>',
      resolve: {
        selectedProduct: function($stateParams, EnterpriseProduct){
          return EnterpriseProduct.get({ id: $stateParams.productId }).$promise;
        }
      }, controller: function($scope, $state, $stateParams){
        console.log('State ' + $state.current.name);
      }
    })

    .state('products.selected.detail', {
      url: "/detail",
      templateUrl: "templates/product_detail.html",
      ncyBreadcrumb: {
        label: '{{ product.entrpPrdctNam }}',
        parent: 'products.list'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, EnterpriseProduct){
        console.log('State ' + $state.current.name);

        $scope.product = selectedProduct;

        $scope.delete = function(product){
          EnterpriseProduct.delete({ id: product.entrpPrdctGid }, function(response){
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
        label: 'Edit',
        parent: 'products.selected.detail'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, EnterpriseProduct, user){
        console.log('Entered products.selected.edit');

        $scope.product = selectedProduct;

        $scope.isModified = function(){
          return dirty;
        };
        
        $scope.save = function(product){
          console.log('Entered save()');
          product.lstUpdtId = user.id;

          EnterpriseProduct.update({ id: product.entrpPrdctGid }, product, function(response){
            console.log('Updated Enterprise Product');
            $state.go('products.selected.detail', {
              productId: $stateParams.productId
            });
          });
        };
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
      ncyBreadcrumb: {
        label: 'Parameters',
        parent: 'products.selected.detail'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, ProductParameter){
        console.log('State ' + $state.current.name);

        $scope.sort = {
          key: 'parameter.parmNam',
          reverse: false
        };

        $scope.setSort = function(key){
          if ( key === $scope.sort.key ){
            $scope.sort.reverse = !$scope.sort.reverse;
          } else {
            $scope.sort.key = key;
            $scope.sort.reverse = false;
          }
        };

        $scope.product = selectedProduct;
        $scope.productParameters = ProductParameter.query({
          entrpPrdctGid: $stateParams.productId 
        });
      }
    })

    .state('products.selected.parameters.new', {
      url: "/new",
      templateUrl: "templates/product_parameter_new.html",
      resolve: {
        parameters: function($stateParams, Parameter){
          return Parameter.query().$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'New',
        parent: 'products.selected.parameters.list'
      },
      controller: function($scope, $state, $stateParams, parameters, selectedProduct, ProductParameter, user) {
        console.log('State ' + $state.current.name);

        $scope.product = selectedProduct;
        $scope.parameters = parameters;

        $scope.productParameter = {
          entrpPrdctGid: $stateParams.productId,
          minOcrncNbr: 0,
          maxOcrncNbr: 99,
          clctdParmInd: 'N',
          lstUpdtId: user.id
        };

        $scope.save = function(prodParm){
          console.log('Entered save()');

          ProductParameter.save(prodParm, function(response){
            console.log('Saved Product Parameter');
            $state.go('products.selected.parameters.list', { 
              entrpPrdctGid: $stateParams.entrpPrdctGid
            });
          });
        };
      }
    })

    .state('products.selected.parameters.selected', {
      abstract: true,
      url: "/{productParmId}",
      template: '<ui-view/>',
      resolve: {
        selectedProductParm: function($stateParams, ProductParameter){
          return ProductParameter.get({ id: $stateParams.productParmId }).$promise;
        }
      }, 
      controller: function($scope, $state, $stateParams){
        console.log('State ' + $state.current.name);
      }
    })

    .state('products.selected.parameters.selected.detail', {
      url: "/detail",
      templateUrl: "templates/product_parameter_detail.html",
      ncyBreadcrumb: {
        label: '{{ productParameter.parameter.parmNam }}',
        parent: 'products.selected.parameters.list'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, selectedProductParm, ProductParameter){
        console.log('State ' + $state.current.name);

        $scope.product = selectedProduct;
        $scope.productParameter = selectedProductParm;

        $scope.delete = function(prodParm){
          console.log('Entered delete()');

          ProductParameter.delete({ id: prodParm.prdctParmGid }, function(response){
            console.log('Deleted Product Parameter');
            $state.go('products.selected.parameters.list', {
              productId: $stateParams.productId
            });
          });
        };
      }
    })

    .state('products.selected.parameters.selected.edit', {
      url: "/edit",
      templateUrl: "templates/product_parameter_edit.html",
      resolve: {
        parameters: function(Parameter){
          return Parameter.query().$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Edit',
        parent: 'products.selected.parameters.selected.detail'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, selectedProductParm, parameters, ProductParameter, user){
        console.log('State ' + $state.current.name);

        $scope.product = selectedProduct;
        $scope.productParameter = selectedProductParm;
        $scope.parameters = parameters;

        $scope.save = function(prodParm){
          console.log('Entered save()');
          prodParm.lstUpdtId = user.id;

          ProductParameter.update({ id: prodParm.prdctParmGid }, prodParm, function(response){
            console.log('Updated Product Parameter');
            $state.go('products.selected.parameters.selected.detail', {
              productId: $stateParams.productId,
              productParmId: $stateParams.productParmId
            });
          });
        };
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
      ncyBreadcrumb: {
        label: 'Formats',
        parent: 'products.selected.detail'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, ProductFormat){
        console.log('State ' + $state.current.name);

        // $scope.sortableOptions = {
        //   //containment: 'window',
        //   axis: 'y',
        //   update: function(event, ui){
        //     console.log('Order updated');
        //   }
        // };

        $scope.product = selectedProduct;
        
        //$scope.entrpPrdctGid = $stateParams.productId;
        $scope.formats = ProductFormat.query({
          entrpPrdctGid: $stateParams.productId
        });

        // ProductFormat.query({
        //   entrpPrdctGid: $stateParams.productId
        // }).$promise.then(function(data){
        //   data.sort(function(a, b){
        //     return a.dsplyOrdrNbr - b.dsplyOrdrNbr;
        //   });
        //   $scope.formats = data;
        // });
      }
    })

    .state('products.selected.formats.new', {
      url: "/new",
      templateUrl: "templates/product_format_new.html",
      ncyBreadcrumb: {
        label: 'New',
        parent: 'products.selected.formats.list'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, ProductFormat, user){
        console.log('State products.selected.formats.new');

        $scope.product = selectedProduct;

        $scope.fieldset = [
          { attributeName: 'prdctFrmtNam', label: 'Name', placeholder: '' },
          { attributeName: 'fileDesc', label: 'Description', placeholder: '' },
          { attributeName: 'fileNamTmpltTxt', label: 'File name', placeholder: '' },
          { attributeName: 'fileExtTxt', label: 'File extension', placeholder: '' },
          { attributeName: 'fileLctnTmpltTxt', label: 'Subdirectory', placeholder: '' },
          { attributeName: 'fileTypCde', label: 'Record type', placeholder: '' },
          { attributeName: 'fldSeparatorVal', label: 'Field separator', placeholder: '' },

          { attributeName: 'fileRqrdInd', label: 'Required', placeholder: '' },
          { attributeName: 'fileCmprsNam', label: 'Compression', placeholder: '' },
          { attributeName: 'gnrtHdrInd', label: 'Header', placeholder: '' },
          { attributeName: 'applyFactActvyFltrInd', label: 'Activity filter', placeholder: '' },
          { attributeName: 'fileMaxRecCnt', label: 'Max lines per file', placeholder: '' },
          { attributeName: 'endOfRecTxt', label: 'End of record marker', placeholder: '' },
          { attributeName: 'dsplyOrdrNbr', label: 'Display order', placeholder: '' },
          { attributeName: 'allowEmptyFileInd', label: 'Allow empty file', placeholder: '' },
          { attributeName: 'applyDstctClusInd', label: 'Unique filter', placeholder: '' },
          { attributeName: 'lineEndngCde', label: 'Line ending', placeholder: '' }
        ];

        $scope.format = {
          entrpPrdctGid: selectedProduct.entrpPrdctGid,
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
    })

    .state('products.selected.formats.selected', {
      abstract: true,
      url: "/{formatId}",
      template: "<ui-view/>",
      resolve: {
        selectedFormat: function($stateParams, ProductFormat){
          return ProductFormat.get({
            id: $stateParams.formatId
          });
        }
      },
      controller: function($scope, $state, $stateParams){
        console.log('State ' + $state.current.name);
      }
    })

    .state('products.selected.formats.selected.detail', {
      url: "/detail",
      templateUrl: "templates/product_format_detail.html",
      ncyBreadcrumb: {
        label: '{{ format.prdctFrmtNam }}',
        parent: 'products.selected.formats.list'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, selectedFormat){
        console.log('State ' + $state.current.name);

        $scope.product = selectedProduct;
        $scope.format = selectedFormat;

      }
    })

    .state('products.selected.formats.selected.edit', {
      url: "/edit",
      templateUrl: "templates/product_format_edit.html",
      ncyBreadcrumb: {
        label: 'Edit',
        parent: 'products.selected.formats.selected.detail'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, selectedFormat, ProductFormat, user){
        console.log('State ' + $state.current.name);

        $scope.product = selectedProduct;
        $scope.format = selectedFormat;

        $scope.save = function(format){
          console.log('Entered save()');
          format.lstUpdtId = user.id;

          ProductFormat.update({ id: format.prdctFrmtGid }, format, function(response){
            console.log('Updated Product Format');
            $state.go('products.selected.formats.list', {
              productId: $stateParams.productId
            });
          });
        };
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
      ncyBreadcrumb: {
        label: 'Attributes',
        parent: 'products.selected.formats.selected.detail'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, selectedFormat, ProductAttribute){
        console.log('State ' + $state.current.name);

        $scope.sortableOptions = {
          //containment: 'window',
          //axis: 'y',
          update: function(event, ui){
            console.log('Entered update function');
          }
        };

        $scope.product = selectedProduct;
        $scope.format = selectedFormat;

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

    .state('products.selected.formats.selected.attributes.new', {
      url: "/new",
      templateUrl: "templates/product_attribute_new.html",
      ncyBreadcrumb: {
        label: 'New',
        parent: 'products.selected.formats.selected.attributes.list'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, selectedFormat, ProductAttribute, user){
        console.log('State ' + $state.current.name);

        $scope.product = selectedProduct;
        $scope.format = selectedFormat;
        $scope.attribute = {
          prdctFrmtGid: selectedFormat.prdctFrmtGid,

          atrbDataAlgnCde: 'L',
          atrbIsFlrInd: 'N',
          atrbDataTypTxt: 'STRING',
          atrbMaxLngthNbr: 10,
          atrbPivotInd: 'N',
          atrbRqrdInd: 'N',
          splitFileOnAtrbValInd: 'N',
          stdAtrbInd: 'N',
          unpivotIdTrgtAtrbInd: 'N',
          unpivotValTrgtAtrbInd: 'N',
          lstUpdtId: user.id
        };

        $scope.save = function(attribute){
          ProductAttribute.save(attribute, function(response){
              console.log('Saved Product Attribute');

              $state.go('products.selected.formats.selected.attributes.list', {
                productId: $stateParams.productId,
                formatId: $stateParams.formatId
              });
          });
        };
      }
    })

    .state('products.selected.formats.selected.attributes.selected', {
      abstract: true,
      url: "/{attributeId}",
      template: '<ui-view/>',
      resolve: {
        selectedAttribute: function($stateParams, ProductAttribute){
          return ProductAttribute.get({ 
            id: $stateParams.attributeId 
          }).$promise;
        }
      },
      ncyBreadcrumb: {
        //label: 'Selected Attribute'
      }, controller: function($scope, $state, $stateParams){
        console.log('State ' + $state.current.name);
      }
    })

    .state('products.selected.formats.selected.attributes.selected.detail', {
      url: "/detail",
      templateUrl: "templates/product_attribute_detail.html",
      ncyBreadcrumb: {
        label: '{{ attribute.atrbNam }}',
        parent: 'products.selected.formats.selected.attributes.list'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, selectedFormat, selectedAttribute, ProductAttribute){
        console.log('State ' + $state.current.name);

        $scope.product = selectedProduct;
        $scope.format = selectedFormat;
        $scope.attribute = selectedAttribute;

        $scope.delete = function(attribute){
          ProductAttribute.delete({ id: attribute.prdctAtrbGid }, function(response){
              console.log('Deleted Product Attribute');

              $state.go('products.selected.formats.selected.attributes.list', {
                productId: $stateParams.productId,
                formatId: $stateParams.formatId
              });
          });
        };
      }
    })

    .state('products.selected.formats.selected.attributes.selected.edit', {
      url: "/edit",
      templateUrl: "templates/product_attribute_edit.html",
      ncyBreadcrumb: {
        label: 'Edit',
        parent: 'products.selected.formats.selected.attributes.selected.detail'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, selectedFormat, selectedAttribute, ProductAttribute, user){
        console.log('State ' + $state.current.name);

        $scope.product = selectedProduct;
        $scope.format = selectedFormat;
        $scope.attribute = selectedAttribute;

        $scope.save = function(attribute){
          console.log('Entered save())');
          attribute.lstUpdtId = user.id;

          ProductAttribute.update({ id: attribute.prdctAtrbGid }, attribute, function(response){
            console.log('Updated Product Attribute');
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
      template: '<ui-view/>',
      ncyBreadcrumb: {
        //label: 'Tasks'
      }
    })

    .state('products.selected.tasks.list', {
      url: "/list",
      templateUrl: "templates/product_task_list.html",
      ncyBreadcrumb: {
        label: 'Tasks',
        parent: 'products.selected.detail'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, ProductTask){
        console.log('State ' + $state.current.name);

        $scope.product = selectedProduct;

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

    .state('products.selected.tasks.new', {
      url: "/new",
      templateUrl: "templates/product_task_new.html",
      ncyBreadcrumb: {
        label: 'New',
        parent: 'products.selected.tasks.list'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, ProductTask, user){
        console.log('State ' + $state.current.name);

        $scope.product = selectedProduct;

        $scope.task = {
          entrpPrdctGid: selectedProduct.entrpPrdctGid,
          taskTypCde: 'EXEC_PROC',
          crteTrgtTblInd: 'N',
          trgtTrnctInd: 'N',
          prepPrtnInd: 'N',
          lstUpdtId: user.id
        };

        $scope.save = function(task){
          console.log('Entered save()');

          ProductTask.save( task, function(response){
            console.log('Saved Product Task');
            $state.go('products.selected.tasks.list', {
              productId: $stateParams.productId
            });

          });
        };
      }
    })

    .state('products.selected.tasks.selected', {
      abstract: true,
      url: "/{taskId}",
      template: '<ui-view/>',
      resolve: {
        selectedTask: function($stateParams, ProductTask){
          return ProductTask.get({ id: $stateParams.taskId }).$promise;
        }
      },
      ncyBreadcrumb: {
        //label: 'Selected Task'
      }, controller: function($scope, $state, $stateParams){
        console.log('State ' + $state.current.name);
      }
    })

    .state('products.selected.tasks.selected.detail', {
      url: "/detail",
      templateUrl: "templates/product_task_detail.html",
      ncyBreadcrumb: {
        label: '{{ task.taskNam }}',
        parent: 'products.selected.tasks.list'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, selectedTask, ProductTask){
        console.log('State ' + $state.current.name);
        $scope.product = selectedProduct;
        $scope.task = selectedTask;

        $scope.delete = function(task){
          console.log('Entered delete()');

          ProductTask.delete({ id: task.taskGid }, function(response){
              console.log('Deleted Product Task');
              $state.go('products.selected.tasks.list', {
                productId: $stateParams.productId
              });
          });
        };
      }
    })

    .state('products.selected.tasks.selected.edit', {
      url: "/edit",
      templateUrl: "templates/product_task_edit.html",
      ncyBreadcrumb: {
        label: 'Edit',
        parent: 'products.selected.tasks.selected.detail'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, selectedTask, ProductTask, user){
        console.log('State ' + $state.current.name);
        $scope.product = selectedProduct;
        $scope.task = selectedTask;

        $scope.save = function(task){
          console.log('Entered save()');
          task.lstUpdtId = user.id;

          ProductTask.update({id: task.taskGid}, task, function(response){
            console.log('Updated Product Task');
            $state.go('products.selected.tasks.selected.detail', {
              productId: $stateParams.productId,
              taskId: $stateParams.taskId
            });
          });
        }
      }
    })

    .state('notFound', {
      url: "/{path:.*}",
      templateUrl: "templates/not-found.html",
      ncyBreadcrumb: {
        label: 'Not found'
      },
      controller: function($scope, $state){
        console.log('State ' + $state.current.name);
      }
    });

})
.controller('ProductEditorController', ['$scope', function($scope){
  console.log('Entered ProductEditorController');

  $scope.indicatorToText = function(ind){
    return ind == "Y" ? 'Yes' : 'No';
  };
}])
.run(function(user){
  // TODO: fetch real user identity
  user.id = 'ip2150';
  user.name = 'Dean Holbrook';
});
