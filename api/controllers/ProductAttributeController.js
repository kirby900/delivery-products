/**
 * AttributeController
 *
 * @description :: Server-side logic for managing Attributes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    updateMultiple: function(request, response){
        console.log('Entered updateMultiple');
        //console.log(request.body);

        var attributes = request.body;
        console.log('Number of attributes: ' + attributes.length);

        attributes.forEach(function(attr, idx){
            ProductAttribute.update({ 
                prdctAtrbGid: attr.prdctAtrbGid 
            }, 
            attr, 
            function(err, updatedRecords){
                if (err) {
                    console.log(err);
                    return response.status(500).send(err);
                }

                if (updatedRecords.length == 0) {
                    return response.status(403).send('No matching Product Attribute');
                }

                console.log('Updated Product Attribute where prdctAtrbGid = ' + updatedRecords[0].prdctAtrbGid);
            });
        });

        // if (err){
        //     console.log(err);
        //     return response.status(500).send(err);
        // }

        // console.log('Updated', updated);
        //return response.status(200).send('Updates processed');
        return response.json([]);
    }	
};

