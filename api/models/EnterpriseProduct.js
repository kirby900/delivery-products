/**
* EnterpriseProduct.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'M_ENTERPRISE_PRODUCT',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  
  attributes: {
    entrpPrdctGid: { columnName: 'ENTRP_PRDCT_GID', type: 'integer', primaryKey: true, autoIncrement: true },
    entrpPrdctNam: { columnName: 'ENTRP_PRDCT_NAM', type: 'string', size: 40, required: true, unique: true },
    entrpPrdctDesc: { columnName: 'ENTRP_PRDCT_DESC', type: 'string', size: 200 },
    entrpPrdctGrpGid: { columnName: 'ENTRP_PRDCT_GRP_GID', type: 'integer' },
    trgtDbNam: { columnName: 'TRGT_DB_NAM', type: 'string', size: 30, required: true },
    trgtSchmaNam: { columnName: 'TRGT_SCHMA_NAM', type: 'string', size: 30, required: true },
    trgtPerlDrvrNam: { columnName: 'TRGT_PERL_DRVR_NAM', type: 'string', size: 20 },
    aprvdInd: { columnName: 'APRVD_IND', type: 'string', size: 1, required: true, defaultsTo: 'N' },
    fileLctnTmpltTxt: { columnName: 'FILE_LCTN_TMPLT_TXT', type: 'string', size: 1000 },

    // Collections linked to an Enterprise Product
    //parameters: { collection: "ProductParameter", via: "entrpPrdctGid" },
    //formats: { collection: "ProductFormat", via: "entrpPrdctGid" },
    //tasks: { collection: "ProductTask", via: "entrpPrdctGid" },

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
