/**
* Parameter.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'M_PARAMETER',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    parmGid: { columnName: 'PARM_GID', type: 'integer', primaryKey: true, autoIncrement: true },
    parmCde: { columnName: 'PARM_CDE', type: 'string', size: 10 },
    parmNam: { columnName: 'PARM_NAM', type: 'string', size: 20, required: true },
    parmDesc: { columnName: 'PARM_DESC', type: 'string', size: 200 },
    parmDataTyp: { columnName: 'PARM_DATA_TYP', type: 'string', size: 20, required: true },
    parmFrmtTxt: { columnName: 'PARM_FRMT_TXT', type: 'string', size: 20 },
    lstUpdtId: { columnName: 'LST_UPDT_ID', type: 'string', size: 60, required: true },
    lstUpdtTstmp: { columnName: 'LST_UPDT_TSTMP', type: 'datetime', required: true }
  },

  beforeValidate: function(values, cb){
    values.lstUpdtTstmp = new Date();
    cb(null, values);
  }

};

