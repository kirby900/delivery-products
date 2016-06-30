/**
 * FormatController
 *
 * @description :: Server-side logic for managing Formats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Promise = require('bluebird');

module.exports = {

    create: function(request, response) {
        FormatService.addFormat(request.body, function(err, data) {
            if (err)
                return response.serverError("Something bad happened!");

            return response.json(data);
        });
    },

    updateMultiple: function(request, response){
        console.log('Entered updateMultiple');

        var formats = request.body;
        console.log('Number of formats: ' + formats.length);

        // Initiate set of update operations
        // Note: Calling update() _without_ a third argument (a callback function) 
        // returns a Bluebird promise. See Waterline documentation at
        // http://sailsjs.org/documentation/reference/waterline-orm/queries
        var operations = [];
        formats.forEach(function(format, idx){
            var operation = ProductFormat.update({ prdctFrmtGid: format.prdctFrmtGid }, format );
            operations.push( operation );
        });

        // If all updates complete successfully, return empty array
        // If any error, return server error response.
        //var promise = new Promise;
        Promise.all(operations)
        .then(function(result){
            console.log('All updates were successful');
            //console.log('result.length = ' + result.length );
            //console.log(result);
            return response.json([]);
        })
        .catch(function(err){
            console.log('One or more updates failed');
            console.log(err);
            return response.status(500).send(err);         
        });
    }   

};

