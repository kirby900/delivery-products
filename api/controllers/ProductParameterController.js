/**
 * ProductParameterController
 *
 * @description :: Server-side logic for managing Productparameters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	find: function(request, response){
		ProductParameterView.find(request.query)
			.then(function(data){
				console.log('Product Parameters found: ' + data.length);
				return response.json(data);
			})
			.catch(function(error){
				return response.status(500).send('Internal server error');
			});
	}
	
};

