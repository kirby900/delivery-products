/**
 * FormatController
 *
 * @description :: Server-side logic for managing Formats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // Find product formats for a given Enterprise Product
  findByEnterpriseProduct: function (req, res, next) {
    var entrpPrdctGid = req.param('entrpPrdctGid');

    ProductFormat.find({ entrpPrdctGid: entrpPrdctGid }, function(err, formats) {
        if (formats === undefined) {
            return res.notFound();
        } 

        if (err) {
            return next(err);
        }

        res.json(formats);
    });
  }

};

