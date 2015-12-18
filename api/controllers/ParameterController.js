/**
 * ParameterController
 *
 * @description :: Server-side logic for managing Parameters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Promise = require('bluebird');

module.exports = {

    testQuery: function(request, response){
        Parameter.query('select * from m_parameter')
        .then(function(data){
            console.log('record count: ' + data.length);
            return response.json(data);
        })
        .catch(function(error){
            return response.status(500).send(error);
        });
    },

    unassignedParametersByProduct: function(request, response){
        console.log('Entered unassignedParametersByProduct');

        if (!request.query.entrpPrdctGid){
            return response.sendStatus(400); // bad request
        }

        console.log(request.query);

        Promise.all([
            Parameter.find({ limit: 500 }),
            ProductParameterView.find({ where: request.query, limit: 500 })
        ]).spread(function(parameters, productParameters){
            //console.log(parameters);
            console.log('parameter count: ' + parameters.length);
            console.log('product parameter count: ' + productParameters.length);

            var assignedParmGids = {};
            productParameters.forEach(function(prodParm){
                //console.log(prodParm);
                assignedParmGids[prodParm.parmGid] = 1;
            });

            var unassignedParameters = [];
            parameters.forEach(function(parm){
                if (!assignedParmGids[parm.parmGid]){
                    unassignedParameters.push(parm);
                }
            });

            console.log('unassigned parameter count: ' + unassignedParameters.length);
            return response.json(unassignedParameters);
        })
        .catch(function(err){
            console.log('unassignedParametersByProduct: error: ', err);
            return response.status(500).send(err);
        })
    }
};

