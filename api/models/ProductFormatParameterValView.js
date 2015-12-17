/**
* ProductFormatParameterValView.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'V_PRODUCT_FORMAT_PARAMETER_VAL',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
	prdctFrmtGid: { columnName: 'PRDCT_FRMT_GID', type: 'integer', required: true },
	prdctParmGid: { columnName: 'PRDCT_PARM_GID', type: 'integer', required: true },
	parmNam: { columnName: 'PARM_NAM', type: 'string', size: 20, required: true },
	parmValTxt: { columnName: 'PARM_VAL_TXT', type: 'string', size: 256, required: true },
	lstUpdtId: { columnName: 'LST_UPDT_ID', type: 'string', size: 60, required: true },
	lstUpdtTstmp: { columnName: 'LST_UPDT_TSTMP', type: 'datetime', required: true }
  }
};

