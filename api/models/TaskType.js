
module.exports = {
  tableName: 'M_TASK_TYPE',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  
  attributes: {
    taskTypCde: { columnName: 'TASK_TYP_CDE', type: 'string', size: 20, primaryKey: true },
    taskTypDesc: { columnName: 'TASK_TYP_DESC', type: 'string', size: 256, required: true },
    lstUpdtId: { columnName: 'LST_UPDT_ID', type: 'string', size: 60, required: true },
    lstUpdtTstmp: { columnName: 'LST_UPDT_TSTMP', type: 'datetime', required: true }
  },

  beforeValidate: function(values, cb){
    values.lstUpdtTstmp = new Date();
    cb(null, values);
  }

};
