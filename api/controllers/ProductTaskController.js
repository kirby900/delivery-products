/**
 * TaskController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // Find product tasks for a given Enterprise Product
  findByEnterpriseProduct: function (req, res, next) {
    var entrpPrdctGid = req.param('entrpPrdctGid');

    ProductTask.find({ entrpPrdctGid: entrpPrdctGid }, function(err, tasks) {
        if (tasks === undefined) {
            return res.notFound();
        } 

        if (err) {
            return next(err);
        }

        res.json(tasks);
    });
  }
	
};
