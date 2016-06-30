
module.exports = {

    getTaskByFormat: function(formatKey, cb) {
        ProductFormat.findOne(formatKey).exec(function(err, format) {
            if (err) 
                return cb(err);

            if (!format) 
                return cb("invalid format key '" + formatKey + "'");

            ProductTask.find({ 
                prdctFrmtGid: formatKey 
            }).exec(function(err, tasks) {
                if (err) 
                    return cb(err);

                if (tasks.length > 0)
                    return cb(null, tasks.pop());

                // No task linked to the format. Create one and return it.
                ProductTask.create({
                    taskNam: "Extract for" + format.prdctFrmtNam,
                    taskTypCde: "FILEGEN",
                    entrpPrdctGid: format.entrpPrdctGid,
                    prdctFrmtGid: format.prdctFrmtGid
                }).exec(function(err, task) {
                    if (err) return cb(err);

                    return cb(null, task);
                });
            });
        });
    },

    createFilegenTask: function(productKey, formatKey, cb) {
        ProductFormat.findOne(formatKey).exec(function(err, format) {
            if (err) return cb(err);

            if (!format)
                return cb("invalid product key '" + productKey + "'");

            ProductTask.create({
                entrpPrdctGid: productKey,
                taskNam: 'Extract for ' + format.prdctFrmtNam,
                taskTypCde: "FILEGEN",
                prdctFrmtGid: formatKey                
            }).exec(function(err, task) {
                if (err) 
                    return cb(err);

                return cb(null, task);
            });
        });
    }
    
};