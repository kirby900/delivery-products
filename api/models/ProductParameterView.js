/**
* ProductParameterView.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'V_PRODUCT_PARAMETER',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    prdctParmGid: { columnName: 'PRDCT_PARM_GID', type: 'integer', required: true },
    parmGid: { columnName: 'PARM_GID', type: 'integer', required: true },
    entrpPrdctGid: { columnName: 'ENTRP_PRDCT_GID', type: 'integer', required: true },
    parmCde: { columnName: 'PARM_CDE', type: 'string', size: 10, required: true },
    parmNam: { columnName: 'PARM_NAM', type: 'string', size: 20, required: true },
    parmDesc: { columnName: 'PARM_DESC', type: 'string', size: 200 },
    parmDataTyp: { columnName: 'PARM_DATA_TYP', type: 'string', size: 20 },
    parmFrmtTxt: { columnName: 'PARM_FRMT_TXT', type: 'string', size: 20 },
    minOcrncNbr: { columnName: 'MIN_OCRNC_NBR', type: 'integer', required: true },
    maxOcrncNbr: { columnName: 'MAX_OCRNC_NBR', type: 'integer' },
    clctdParmInd: { columnName: 'CLCTD_PARM_IND', type: 'string', size: 1, required: true },
    clctdValExprsTxt: { columnName: 'CLCTD_VAL_EXPRS_TXT', type: 'string', size: 2000 },
    rltdColNam: { columnName: 'RLTD_COL_NAM', type: 'string', size: 30 },
    displayOrder: { columnName: 'DISPLAY_ORDER', type: 'integer' },
    role: { columnName: 'ROLE', type: 'string', size: 30 },
    templateGid: { columnName: 'TEMPLATE_GID', type: 'integer' },
    templateName: { columnName: 'TEMPLATE_NAME', type: 'string', size: 30 }
  }
};
