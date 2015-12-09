/**
* ProductFormat.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'M_PRODUCT_FORMAT',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  
  attributes: {
    prdctFrmtGid: { columnName: 'PRDCT_FRMT_GID', type: 'integer', primaryKey: true, autoIncrement: true },
    entrpPrdctGid: { columnName: 'ENTRP_PRDCT_GID', type: 'integer', required: true },
    //enterpriseProduct: { model: 'EnterpriseProduct', columnName: 'ENTRP_PRDCT_GID', type: 'integer', required: true },

    prdctFrmtNam: { columnName: 'PRDCT_FRMT_NAM', type: 'string', size: 100, required: false },
    fileNamTmpltTxt: { columnName: 'FILE_NAM_TMPLT_TXT', type: 'string', size: 256 },
    fileDesc: { columnName: 'FILE_DESC', type: 'string', size: 255 },
    fileTypCde: { columnName: 'FILE_TYP_CDE', type: 'string', size: 20 },
    fileRqrdInd: { columnName: 'FILE_RQRD_IND', type: 'string', size: 1, defaultsTo: 'N' },
    fldSeparatorVal: { columnName: 'FLD_SEPARATOR_VAL', type: 'string', size: 3 },
    fldDlmtrVal: { columnName: 'FLD_DLMTR_VAL', type: 'string', size: 3 },
    fileCmprsNam: { columnName: 'FILE_CMPRS_NAM', type: 'string', size: 60 },
    fileExtTxt: { columnName: 'FILE_EXT_TXT', type: 'string', size: 10 },
    fileLctnTmpltTxt: { columnName: 'FILE_LCTN_TMPLT_TXT', type: 'string', size: 1000 },
    gnrtHdrInd: { columnName: 'GNRT_HDR_IND', type: 'string', size: 1, defaultsTo: 'N' },
    applyFactActvyFltrInd: { columnName: 'APPLY_FACT_ACTVY_FLTR_IND', type: 'string', size: 1, defaultsTo: 'N' },
    fileMaxRecCnt: { columnName: 'FILE_MAX_REC_CNT', type: 'integer' },
    endOfRecTxt: { columnName: 'END_OF_REC_TXT', type: 'string', size: 3 },
    dsplyOrdrNbr: { columnName: 'DSPLY_ORDR_NBR', type: 'integer' },
    allowEmptyFileInd: { columnName: 'ALLOW_EMPTY_FILE_IND', type: 'string', size: 1, defaultsTo: 'N' },
    applyDstctClusInd: { columnName: 'APPLY_DSTCT_CLUS_IND', type: 'string', size: 1, defaultsTo: 'N' },
    lineEndngCde: { columnName: 'LINE_ENDNG_CDE', type: 'string', size: 10, defaultsTo: 'LF' },

    // A format has a set of fields
    //fields: { collection: 'FormatAttribute', via: 'prdctFrmtGid' },

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
