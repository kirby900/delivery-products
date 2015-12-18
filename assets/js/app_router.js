
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
      ncyBreadcrumb: {
        label: 'Home'
      },
      controller: function($state){
        console.log('State ' + $state.current.name);
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
      ncyBreadcrumb: {
        label: 'Parameters'
      },
      controller: function($scope, $state, Parameter){
        console.log('State ' + $state.current.name);

        $scope.sortOptions = {
          key: 'parmNam',
          reverse: false
        };

        $scope.sort = function(key){
          if ( key === $scope.sortOptions.key ){
            $scope.sortOptions.reverse = !$scope.sortOptions.reverse;
          } else {
            $scope.sortOptions.key = key;
            $scope.sortOptions.reverse = false;
          }
        };

        // query() method immediately returns an array that 
        // will be populated once database call finishes.
        $scope.parameters = Parameter.query();
      }
    })

    .state('parameters.new', {
      url: "/new",
      templateUrl: "templates/parameter_new.html",
      ncyBreadcrumb: {
        label: 'New',
        parent: 'parameters.list'
      },
      controller: function($scope, $state, ParameterDataType, Parameter, user) {
        console.log('State ' + $state.current.name);

        $scope.types = ParameterDataType.types;

        $scope.parameter = {
          parmDataTyp: 'STRING'
        };

        $scope.save = function(parameter){
          console.log('Entered save()');

          parameter.lstUpdtId = user.id;
          Parameter.save(parameter, function(response){
            console.log('Saved Parameter');
            $state.go('parameters.list');
          });
        };
      }
    })

    .state('parameters.selected', {
      abstract: true,
      url: "/{parameterId}",
      template: '<ui-view/>',
      resolve: {
        selectedParameter: function($stateParams, Parameter){
          return Parameter.get({ id: $stateParams.parameterId }).$promise;
        }
      }, 
      controller: function($state){
        console.log('State ' + $state.current.name);
      }
    })

    .state('parameters.selected.detail', {
      url: "/detail",
      templateUrl: "templates/parameter_detail.html",
      ncyBreadcrumb: {
        label: '{{ parameter.parmNam }}',
        parent: 'parameters.list'
      },
      controller: function($scope, $state, $stateParams, selectedParameter, Parameter){
        console.log('State ' + $state.current.name);

        $scope.parameter = selectedParameter;

        $scope.delete = function(parameter){
          console.log('Entered delete()');

          Parameter.delete({ id: parameter.parmGid }, function(response){
            console.log('Deleted Parameter');
            $state.go('parameters.list');
          });
        };
      }
    })

    .state('parameters.selected.edit', {
      url: "/edit",
      templateUrl: "templates/parameter_edit.html",
      ncyBreadcrumb: {
        label: 'Edit',
        parent: 'parameters.selected.detail'
      },
      controller: function($scope, $state, $stateParams, selectedParameter, ParameterDataType, Parameter){
        console.log('State ' + $state.current.name);

        $scope.types = ParameterDataType.types;
        $scope.parameter = selectedParameter;

        $scope.save = function(parameter){
          console.log('Entered save()');

          Parameter.update({ id: parameter.parmGid }, parameter, function(response){
            console.log('Updated Parameter');
            $state.go('parameters.selected.detail', {
              parameterId: $stateParams.parameterId
            });
          });
        };
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
      resolve: {
        products: function(EnterpriseProduct){
          return EnterpriseProduct.query().$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Products'
      },
      controller: function($scope, $state, EnterpriseProduct){
        console.log('State ' + $state.current.name);

        $scope.sortOptions = {
          key: 'entrpPrdctNam',
          reverse: false
        };

        $scope.sort = function(key){
          if ( key === $scope.sortOptions.key ){
            $scope.sortOptions.reverse = !$scope.sortOptions.reverse;
          } else {
            $scope.sortOptions.key = key;
            $scope.sortOptions.reverse = false;
          }
        };

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

        $scope.sortOptions = {
          key: 'parmNam',
          reverse: false
        };

        $scope.sort = function(key){
          if ( key === $scope.sortOptions.key ){
            $scope.sortOptions.reverse = !$scope.sortOptions.reverse;
          } else {
            $scope.sortOptions.key = key;
            $scope.sortOptions.reverse = false;
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
        },
        usedParameters: function($stateParams, ProductParameter){
          return ProductParameter.query({ entrpPrdctGid: $stateParams.productId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'New',
        parent: 'products.selected.parameters.list'
      },
      controller: function($scope, $state, $stateParams, parameters, usedParameters, selectedProduct, ProductParameter, user) {
        console.log('State ' + $state.current.name);

        // Build list of parameters NOT already linked to product
        var assignedParmKeys = {};
        usedParameters.forEach(function(parm){
          assignedParmKeys[parm.parmGid] = 1;
        });

        var availableParameters = [];
        parameters.forEach(function(parm){
          if ( !assignedParmKeys[parm.parmGid] ){
            availableParameters.push(parm);
          }
        })

        $scope.product = selectedProduct;
        $scope.parameters = availableParameters;

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
      resolve: {
        formats: function($stateParams, ProductFormat){
          console.log('Entered resolve formats in state products.selected.formats.list');
          return ProductFormat.query({ entrpPrdctGid: $stateParams.productId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Formats',
        parent: 'products.selected.detail'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, formats, ProductFormat){
        console.log('State ' + $state.current.name);

        $scope.product = selectedProduct;        
        $scope.formats = formats;

        $scope.sortOptions = {
          key: 'dsplyOrdrNbr',
          reverse: false
        };

        $scope.sort = function(key){
          if ( key === $scope.sortOptions.key ){
            $scope.sortOptions.reverse = !$scope.sortOptions.reverse;
          } else {
            $scope.sortOptions.key = key;
            $scope.sortOptions.reverse = false;
          }
        };
      }
    })

    .state('products.selected.formats.reorder', {
      url: "/reorder",
      templateUrl: "templates/product_format_reorder.html",
      resolve: {
        formats: function($stateParams, ProductFormat){
          console.log('Entered resolve formats in state products.selected.formats.reorder')
          return ProductFormat.query({ entrpPrdctGid: $stateParams.productId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Arrange',
        parent: 'products.selected.formats.list'
      },
      controller: 'FormatOrderController'
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
    })

    .state('products.selected.formats.selected', {
      abstract: true,
      url: "/{formatId}",
      template: "<ui-view/>",
      resolve: {
        selectedFormat: function($stateParams, ProductFormat){
          return ProductFormat.get({ id: $stateParams.formatId }).$promise;
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

    .state('products.selected.formats.selected.displayconditions', {
      url: "/displayConditions",
      templateUrl: "templates/product_format_display_conditions.html",
      resolve: {
        productFormatParameterVals: function($stateParams, ProductFormatParameterVal){
          console.log('Entered resolve productFormatParameterVals in state products.selected.formats.selected.displayconditions');
          return ProductFormatParameterVal.query({ prdctFrmtGid: $stateParams.formatId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Display Settings',
        parent: 'products.selected.formats.selected.detail'
      },
      controller: 'ProductFormatDisplayConditionsController'
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
      resolve: {
        productAttributes: function($stateParams, ProductAttribute){
          console.log('Entered resolve productAttributes in state products.selected.formats.selected.attributes.list');
          return ProductAttribute.query({ prdctFrmtGid: $stateParams.formatId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Attributes',
        parent: 'products.selected.formats.selected.detail'
      },
      controller: function($scope, $state, $stateParams, selectedProduct, selectedFormat, productAttributes, ProductAttribute, user){
        console.log('State ' + $state.current.name);

        $scope.product = selectedProduct;
        $scope.format = selectedFormat;
        $scope.attributes = productAttributes;

        $scope.sortOptions = {
          key: 'atrbOrdrNbr',
          reverse: false
        };

        $scope.sort = function(key){
          console.log('Sort by ' + key);
          if ( key === $scope.sortOptions.key ){
            console.log('Toggle sort order');
            $scope.sortOptions.reverse = !$scope.sortOptions.reverse;
          } else {
            $scope.sortOptions.key = key;
            $scope.sortOptions.reverse = false;
          }
        };

        $scope.updateFlag = function(prodAttr, propertyName){
          console.log('Entered updateFlag()');
          console.log(prodAttr.atrbNam + ': updating ' + propertyName + ' to ' + prodAttr[propertyName]);

          // Create an object with only the changing properties,
          // rather than updating the _entire_ set of columns.
          var atrb = {};
          atrb[propertyName] = prodAttr[propertyName];
          atrb.lstUpdtId = user.id;

          ProductAttribute.update({ id: prodAttr.prdctAtrbGid }, atrb, function(response){
            console.log('Updated Product Attribute');
          });        
        };
      }
    })

    .state('products.selected.formats.selected.attributes.reorder', {
      url: "/reorder",
      templateUrl: "templates/product_attribute_reorder.html",
      resolve: {
        productAttributes: function($stateParams, ProductAttribute){
          console.log('Entered resolve productAttributes in state products.selected.formats.selected.attributes.reorder')
          return ProductAttribute.query({ prdctFrmtGid: $stateParams.formatId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Arrange',
        parent: 'products.selected.formats.selected.attributes.list'
      },
      controller: 'AttributeOrderController'
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
          return ProductAttribute.get({ id: $stateParams.attributeId }).$promise;
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
            $state.go('products.selected.formats.selected.attributes.selected.detail', {
              productId: $stateParams.productId,
              formatId: $stateParams.formatId,
              attributeId: $stateParams.attributeId
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
      resolve: {
        tasks: function($stateParams, ProductTask){
          return ProductTask.query({ entrpPrdctGid: $stateParams.productId }).$promise;
        }
      },
      controller: function($scope, $state, $stateParams, selectedProduct, tasks){
        console.log('State ' + $state.current.name);

        $scope.product = selectedProduct;
        $scope.tasks = tasks;

        $scope.sortOptions = {
          key: 'taskSeqNbr',
          reverse: false
        };

        $scope.sort = function(key){
          //console.log('Entered sort');
          //console.log('key = ' + key);

          if ( key === $scope.sortOptions.key ){
            $scope.sortOptions.reverse = !$scope.sortOptions.reverse;
          } else {
            $scope.sortOptions.key = key;
            $scope.sortOptions.reverse = false;
          }
        };
      }
    })

    .state('products.selected.tasks.reorder', {
      url: "/reorder",
      templateUrl: "templates/product_task_reorder.html",
      resolve: {
        tasks: function($stateParams, ProductTask){
          console.log('Entered resolve tasks in state products.selected.tasks.reorder')
          return ProductTask.query({ entrpPrdctGid: $stateParams.productId }).$promise;
        }
      },
      ncyBreadcrumb: {
        label: 'Arrange',
        parent: 'products.selected.tasks.list'
      },
      controller: 'TaskOrderController'
    })

    .state('products.selected.tasks.new', {
      url: "/new",
      templateUrl: "templates/product_task_new.html",
      ncyBreadcrumb: {
        label: 'New',
        parent: 'products.selected.tasks.list'
      },
      resolve: {
        taskTypes: function(TaskType){
          return TaskType.query().$promise;
        }
      },
      controller: function($scope, $state, $stateParams, selectedProduct, taskTypes, ProductTask, user){
        console.log('State ' + $state.current.name);

        $scope.product = selectedProduct;
        $scope.taskTypes = taskTypes;

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
      resolve: {
        taskTypes: function(TaskType){
          return TaskType.query().$promise;
        }
      },
      controller: function($scope, $state, $stateParams, selectedProduct, selectedTask, taskTypes, ProductTask, user){
        console.log('State ' + $state.current.name);
        $scope.product = selectedProduct;
        $scope.task = selectedTask;
        $scope.taskTypes = taskTypes;

        $scope.save = function(task){
          console.log('Entered save()');
          task.lstUpdtId = user.id;

          ProductTask.update({id: task.taskGid}, task, function(response){
            console.log('Updated Product Task');
            $state.go('products.selected.tasks.selected.detail', {
              productId: $stateParams.productId,
              taskId: $stateParams.taskId
            });
          }, function(response){
            console.log('Update failed');
            console.log(response);
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

});
