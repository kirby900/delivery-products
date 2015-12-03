/**
* ProductFormatParameterVal.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'M_PRODUCT_FORMAT_PARAMETER_VAL',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
	prdctFrmtGid: { columnName: 'PRDCT_FRMT_GID', type: 'integer', primaryKey: true, required: true },
	//prdctParmGid: { columnName: 'PRDCT_PARM_GID', type: 'integer', primaryKey: true, required: true },
	productParameter: { model: 'ProductParameter', columnName: 'PRDCT_PARM_GID', type: 'integer', primaryKey: true, required: true },
	parmValTxt: { columnName: 'PARM_VAL_TXT', type: 'string', size: 256, primaryKey: true, required: true },

    lstUpdtId: { columnName: 'LST_UPDT_ID', type: 'string', size: 60 },
    lstUpdtTstmp: { columnName: 'LST_UPDT_TSTMP', type: 'datetime' }
  },

  beforeCreate: function(values, cb){
    values.lstUpdtTstmp = new Date();
    cb(null, values);
  },
  beforeUpdate: function(values, cb){
    values.lstUpdtTstmp = new Date();
    cb(null, values);
  }
};

