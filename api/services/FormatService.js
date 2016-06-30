
function gen_column_alias(name) {
    var str = name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, '_');
    return str.substr(0, 30);
}

module.exports = {
    // Insert new Product Format. Add a corresonding Product Task,
    // since a format needs the task to link the attribute mappings.
    addFormat: function(fmt, cb) {
        ProductFormat.create(fmt).exec(function(err, format) {
            if (err) return cb(err);

            sails.log.info("new format key = " + format.prdctFrmtGid);

            // Create an associated Product Task
            TaskService.createFilegenTask(format.entrpPrdctGid, format.prdctFrmtGid, function(err, task){
                if (err) return cb(err);

                sails.log.info("new task key = " + task.taskGid);
                // Return the new Product Format
                return cb(null, format);
            });
        });
    },

    addAttribute: function(newAttr, cb) {
        // Find the parent format
        var formatKey = newAttr.prdctFrmtGid;
        ProductFormat.find({ 
            prdctFrmtGid: formatKey
        }).exec(function(err, formats) {
            if (err) return cb(err);

            if (formats.length == 0)
                cb("Error: invalid format key '" + formatKey + "'");
            
            var format = formats.pop();

            // Find the associated task, or create one.
            TaskService.getTaskByFormat(newAttr.prdctFrmtGid, function(err, task) {
                if (err) return cb(err);

                // Find max attribute order number of existing attributes
                var pa = ProductAttribute.find({ 
                    prdctFrmtGid: formatKey
                }).sort('atrbOrdrNbr DESC').limit(1).exec(function(err, attrs) {
                    if (err) return cb(err);

                    var maxOrdrNbr = attrs.shift().atrbOrdrNbr;
                    sails.log.info("Max attribute order number returned = " + maxOrdrNbr);
                    newAttr.atrbOrdrNbr = maxOrdrNbr ? 1 + maxOrdrNbr : 1;
                    sails.log.info("Calculated attribute order number = " + newAttr.atrbOrdrNbr);

                    ProductAttribute.create(newAttr).exec(function(err, attribute) {
                        if (err) return cb(err);

                        var attributeKey = attribute.prdctAtrbGid;
                        var columnAlias = gen_column_alias(attribute.atrbNam);
                        sails.log.info("new attribute key=" + attributeKey);
                        sails.log.info("generated column alias = " + columnAlias);

                        ProductTaskAttributeMap.create({
                            taskGid: task.taskGid,
                            trgtAtrbGid: attributeKey,
                            srceExprsTxt: 'NULL',
                            colAliasNam: columnAlias
                        }).exec(function(err, attributeMap) {
                            if (err) return cb(err);

                            sails.log.info("new attribute map key=" + attributeMap.fldMapngGid);

                            // Return the new Product Attribute
                            return cb(null, attribute);
                        });
                    });
                    
                });

            });
        });
    }

};
