/**
* ParameterTemplate.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'presentation',
  tableName: 'T_UI_PARAMETER_TEMPLATE',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    templateGid:  { columnName: 'TEMPLATE_GID', type: 'integer', primaryKey: true },
    templateName: { columnName: 'TEMPLATE_NAME', type: 'string', size: 30 },
    templateDesc: { columnName: 'TEMPLATE_DESC', type: 'string', size: 200 },
    templateText: { columnName: 'TEMPLATE_TEXT', type: 'string', size: 255 },
    lstUpdtId:    { columnName: 'LST_UPDT_ID', type: 'string', size: 60 },
    lstUpdtTstmp: { columnName: 'LST_UPDT_TSTMP', type: 'datetime' }
  },

  beforeValidate: function(values, cb){
    values.lstUpdtTstmp = new Date();
    cb(null, values);
  }
};
