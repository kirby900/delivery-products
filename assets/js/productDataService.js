/*
** This code creates a service to handle interactions with the data store.
** It uses Angular ngResource to generate functions for standard CRUD
** operations.
*/
angular.module('ProductDataService', ['ngResource'])
.factory('Parameter', ['$resource', function($resource){
    console.log('Entered factory function for Parameter');

    /*
    ** Object returned from $resource has the following methods
    **   query  : retrieve list of Parameters
    **   get    : fetch single Parameter
    **   save   : add new Parameter to data store
    **   update : write change to data store
    **   delete : delete Parameter from data store
    **   remove : alias for delete
    */
    return $resource(
        '/parameters/:id',             // the associated URL
        { id: '@parmGid' },            // map id parameter to a property
        {                              // additional or override methods
            update: { method: 'PUT' }
        }
    );
}])
.factory('EnterpriseProduct', ['$resource', function($resource){
    console.log('Entered factory function for EnterpriseProduct');

    return $resource(
        '/enterpriseProducts/:id',         // the associated URL
        { id: '@entrpPrdctGid' },          // map id parameter to a property
        {                                  // additional or override methods
            update: { method: 'PUT' }
        }
    );
}])
.factory('ProductParameter', ['$resource', function($resource){
    console.log('Entered factory function for ProductParameter');

    return $resource(
        '/productParameters/:id',         // the associated URL
        { id: '@prdctParmGid' },          // map id parameter to a property
        {                                 // additional or override methods
            update: { method: 'PUT' }
        }
    );
}])
.factory('ProductFormat', ['$resource', function($resource){
    console.log('Entered factory function for ProductFormat');

    return $resource(
        '/productFormats/:id',         // the associated URL
        { id: '@prdctFrmtGid' },       // map id parameter to a property
        {                              // additional or override methods
            update: { method: 'PUT' }
        }
    );
}])
.factory('ProductTask', ['$resource', function($resource){
    console.log('Entered factory function for ProductTask');

    return $resource(
        '/productTasks/:id',           // the associated URL
        { id: '@taskGid' },            // map id parameter to a property
        {                              // additional or override methods
            update: { method: 'PUT' }
        }
    );
}])
.factory('ProductAttribute', ['$resource', function($resource){
    console.log('Entered factory function for ProductAttribute');

    return $resource(
        '/productAttributes/:id',      // the associated URL
        { id: '@prdctAtrbGid' },       // map id parameter to a property
        {                              // additional or override methods
            update: { method: 'PUT' }
        }
    );
}])
;
