/**
* ProductTask.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

/*
+----------------+--------------+------+-----+---------+----------------+
| Field          | Type         | Null | Key | Default | Extra          |
+----------------+--------------+------+-----+---------+----------------+
| FLD_MAPNG_GID  | int(11)      | NO   | PRI | NULL    | auto_increment |
| SRCE_EXPRS_TXT | varchar(256) | NO   |     | NULL    |                |
| AGG_IND        | char(1)      | NO   |     | NULL    |                |
| ORDR_NBR       | smallint(6)  | YES  |     | NULL    |                |
| TASK_GID       | int(11)      | YES  |     | NULL    |                |
| TRGT_ATRB_GID  | int(11)      | YES  |     | NULL    |                |
| RQMT_GID       | int(11)      | YES  |     | NULL    |                |
| COL_ALIAS_NAM  | varchar(30)  | YES  |     | NULL    |                |
| LST_UPDT_ID    | varchar(60)  | NO   |     | NULL    |                |
| LST_UPDT_TSTMP | datetime     | NO   |     | NULL    |                |
+----------------+--------------+------+-----+---------+----------------+
*/  

module.exports = {
  tableName: 'M_PRODUCT_TASK_ATTRIBUTE_MAP',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    fldMapngGid: { columnName: 'FLD_MAPNG_GID', type: 'integer', primaryKey: true, autoIncrement: true },
    srceExprsTxt: { columnName: 'SRCE_EXPRS_TXT', type: 'string', size: 256, required: true },
    aggInd: { columnName: 'AGG_IND', type: 'string', size: 1, defaultsTo: 'N' },
    taskGid: { columnName: 'TASK_GID', type: 'integer', required: true },
    trgtAtrbGid: { columnName: 'TRGT_ATRB_GID', type: 'integer', required: true },
    colAliasNam: { columnName: 'COL_ALIAS_NAM', type: 'string', size: 30 },

    lstUpdtId: { columnName: 'LST_UPDT_ID', type: 'string', size: 60 },
    lstUpdtTstmp: { columnName: 'LST_UPDT_TSTMP', type: 'datetime' }
  },

  beforeValidate: function(values, cb){
    values.lstUpdtTstmp = new Date();
    cb(null, values);
  }

};
