/**
* ProductAttribute.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'M_PRODUCT_ATTRIBUTE',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  
  attributes: {
    prdctAtrbGid: { columnName: 'PRDCT_ATRB_GID', type: 'integer', required: false, primaryKey: true, autoIncrement: true },
    // prdctFrmtGid is key to the parent Product Format
    //prdctFrmtGid: { model: "ProductFormat", columnName: 'PRDCT_FRMT_GID', type: 'integer', required: true },
    prdctFrmtGid: { columnName: 'PRDCT_FRMT_GID', type: 'integer', required: true },
    atrbNam: { columnName: 'ATRB_NAM', type: 'string', size: 60, required: true },
    atrbDesc: { columnName: 'ATRB_DESC', type: 'string', size: 2000 },
    atrbHdrNam: { columnName: 'ATRB_HDR_NAM', type: 'string', size: 256 },
    atrbOrdrNbr: { columnName: 'ATRB_ORDR_NBR', type: 'integer' },
    atrbFrmtTxt: { columnName: 'ATRB_FRMT_TXT', type: 'string', size: 256 },
    atrbMaxLngthNbr: { columnName: 'ATRB_MAX_LNGTH_NBR', type: 'integer' },
    atrbDataAlgnCde: { columnName: 'ATRB_DATA_ALGN_CDE', type: 'string', size: 20 },
    atrbDfltVal: { columnName: 'ATRB_DFLT_VAL', type: 'string', size: 256 },
    atrbIsFlrInd: { columnName: 'ATRB_IS_FLR_IND', type: 'string', size: 1, defaultsTo: 'N' },
    atrbPadVal: { columnName: 'ATRB_PAD_VAL', type: 'string', size: 256 },
    atrbDataTypTxt: { columnName: 'ATRB_DATA_TYP_TXT', type: 'string', size: 20 },
    atrbPivotInd: { columnName: 'ATRB_PIVOT_IND', type: 'string', size: 1, defaultTo: 'N' },
    atrbRqrdInd: { columnName: 'ATRB_RQRD_IND', type: 'string', size: 1, defaultsTo: 'N' },
    aggFnctnCde: { columnName: 'AGG_FNCTN_CDE', type: 'string', size: 10 },
    pivotSortOrdr: { columnName: 'PIVOT_SORT_ORDR', type: 'string', size: 4 },
    aggNullPlugVal: { columnName: 'AGG_NULL_PLUG_VAL', type: 'string', size: 256 },
    splitFileOnAtrbValInd: { columnName: 'SPLIT_FILE_ON_ATRB_VAL_IND', type: 'string', size: 1, defaultsTo: 'N' },
    stdAtrbInd: { columnName: 'STD_ATRB_IND', type: 'string', size: 1, defaultsTo: 'N' },
    txtWrapVal: { columnName: 'TXT_WRAP_VAL', type: 'string', size: 3 },
    ordrByRankNbr: { columnName: 'ORDR_BY_RANK_NBR', type: 'integer' },
    unpivotSrceAtrbId: { columnName: 'UNPIVOT_SRCE_ATRB_ID', type: 'string', size: 10 },
    unpivotIdTrgtAtrbInd: { columnName: 'UNPIVOT_ID_TRGT_ATRB_IND', type: 'string', size: 1, defaultsTo: 'N' },
    unpivotValTrgtAtrbInd: { columnName: 'UNPIVOT_VAL_TRGT_ATRB_IND', type: 'string', size: 1, defaultsTo: 'N' },
    pivotValFnctnNam: { columnName: 'PIVOT_VAL_FNCTN_NAM', type: 'string', size: 80 },
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
