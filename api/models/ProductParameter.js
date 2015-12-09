/**
* ProductParameter.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'M_PRODUCT_PARAMETER',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    prdctParmGid: { columnName: 'PRDCT_PARM_GID', type: 'integer', primaryKey: true, autoIncrement: true },
    //parmGid: { /*model: 'Parameter',*/ columnName: 'PARM_GID', type: 'integer', required: true },
    parameter: { model: 'Parameter', columnName: 'PARM_GID', type: 'integer', required: true },
    entrpPrdctGid: { /*model: 'EnterpriseProduct',*/ columnName: 'ENTRP_PRDCT_GID', type: 'integer', required: true },
    //enterpriseProduct: { model: 'EnterpriseProduct', columnName: 'ENTRP_PRDCT_GID', type: 'integer', required: true },
    minOcrncNbr: { columnName: 'MIN_OCRNC_NBR', type: 'integer', required: true },
    maxOcrncNbr: { columnName: 'MAX_OCRNC_NBR', type: 'integer' },
    clctdParmInd: { columnName: 'CLCTD_PARM_IND', type: 'string', size: 1, required: true },
    clctdValExprsTxt: { columnName: 'CLCTD_VAL_EXPRS_TXT', type: 'string', size: 2000 },
    rltdColNam: { columnName: 'RLTD_COL_NAM', type: 'string', size: 30 },
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
