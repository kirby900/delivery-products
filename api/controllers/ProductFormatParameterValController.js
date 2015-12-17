/**
 * ProductFormatParameterValController
 *
 * @description :: Server-side logic for managing Productformatparametervals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	// Use database view rather than table in order to get parameter name
	find: function(request, response){
		ProductFormatParameterValView.find(request.query)
			.then(function(data){
				console.log('Product Parameter Values found: ' + data.length);

				// var paramSet = {};
				// data.forEach(function(parmVal){
				// 	if (paramSet[parmVal.prdctParmGid]){
				// 		paramSet[parmVal.prdctParmGid].push(parmVal.parmValTxt);
				// 	} else {
				// 		paramSet[parmVal.prdctParmGid] = [parmVal.parmValTxt];
				// 	}
				// });

				// var params = [];
				// Object.keys(paramSet).forEach(function(key){
				// 	params.push({ prdctParmGid: key, parmValues: paramSet[key] });
				// });

				// return response.json(params);
				return response.json(data);
			})
			.catch(function(error){
				return response.status(500).send('Internal server error');
			});
	}
};

