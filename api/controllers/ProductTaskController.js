/**
 * TaskController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Promise = require('bluebird');

module.exports = {

    updateMultiple: function(request, response){
        console.log('Entered updateMultiple');

        var tasks = request.body;
        console.log('Number of tasks: ' + tasks.length);

        // Initiate set of update operations
        // Note: Calling update() _without_ a third argument (a callback function) 
        // returns a Bluebird promise. See Waterline documentation at
        // http://sailsjs.org/documentation/reference/waterline-orm/queries
        var operations = [];
        tasks.forEach(function(task, idx){
            var operation = ProductTask.update({ taskGid: task.taskGid }, task );
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
