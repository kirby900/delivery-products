/**
* AggregateFunction.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'M_AGGREGATE_FUNCTION',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    aggFnctnCde: { columnName: 'AGG_FNCTN_CDE', type: 'string', size: 10, required: true, primaryKey: true },
    aggFnctnNam: { columnName: 'AGG_FNCTN_NAM', type: 'string', size: 40, required: true },
    lstUpdtId: { columnName: 'LST_UPDT_ID', type: 'string', size: 60, required: true },
    lstUpdtTstmp: { columnName: 'LST_UPDT_TSTMP', type: 'datetime', required: true }
  },

  beforeValidate: function(values, cb){
    values.lstUpdtTstmp = new Date();
    cb(null, values);
  }
};
