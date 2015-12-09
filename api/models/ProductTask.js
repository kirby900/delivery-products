/**
* ProductTask.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'M_PRODUCT_TASK',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  
  attributes: {
    taskGid: { columnName: 'TASK_GID', type: 'integer', primaryKey: true, autoIncrement: true },
    entrpPrdctGid: { columnName: 'ENTRP_PRDCT_GID', type: 'integer', required: true },
    //enterpriseProduct: { model: "EnterpriseProduct", columnName: 'ENTRP_PRDCT_GID', type: 'integer', required: true },
    taskNam: { columnName: 'TASK_NAM', type: 'string', size: 60, required: true },
    taskSeqNbr: { columnName: 'TASK_SEQ_NBR', type: 'integer', required: false },
    taskTypCde: { columnName: 'TASK_TYP_CDE', type: 'string', size: 20 },
    srceSqlTmpltTxt: { columnName: 'SRCE_SQL_TMPLT_TXT', type: 'string', size: 4000 },
    crteTrgtTblInd: { columnName: 'CRTE_TRGT_TBL_IND', type: 'string', size: 1, defaultsTo: 'N' },
    trgtTrnctInd: { columnName: 'TRGT_TRNCT_IND', type: 'string', size: 1, defaultsTo: 'N' },
    rqmtGid: { columnName: 'RQMT_GID', type: 'integer' },
    trgtPrdctDataObjctGid: { columnName: 'TRGT_PRDCT_DATA_OBJCT_GID', type: 'integer' },
    prepPrtnInd: { columnName: 'PREP_PRTN_IND', type: 'string', size: 1, defaultsTo: 'N' },
    extnlPgmNam: { columnName: 'EXTNL_PGM_NAM', type: 'string', size: 256 },
    extnlPgmArgListTxt: { columnName: 'EXTNL_PGM_ARG_LIST_TXT', type: 'string', size: 256 },
    prdctFrmtGid: { columnName: 'PRDCT_FRMT_GID', type: 'integer' },

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
