/**
 * ProductParameterController
 *
 * @description :: Server-side logic for managing Productparameters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  // Find product parameters for a given Enterprise Product
  findByEnterpriseProduct: function (req, res, next) {
    var entrpPrdctGid = req.param('entrpPrdctGid');

    ProductParameter.find({ entrpPrdctGid: entrpPrdctGid }, function(err, productParms) {
        if (productParms === undefined) {
            return res.notFound();
        } 

        if (err) {
            return next(err);
        }

        res.json(productParms);
    });
  }
};

