/**
 * ProductParameterController
 *
 * @description :: Server-side logic for managing Productparameters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	// For faster response than using the ORM's associations when returning
	// a list of product parameters, query the product parameter view instead.
	// It has a join to the parameter table.
	find: function(request, response){
		ProductParameterView.find(request.query)
			.then(function(data){
				//console.log('Product Parameters found: ' + data.length);
				return response.json(data);
			})
			.catch(function(error){
				console.log(error);
				return response.sendStatus(500);
			});
	}
	
};

