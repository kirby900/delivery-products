/**
* DataSource.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'M_DATA_SOURCE',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    dataSrceGid: { columnName: 'DATA_SRCE_GID', type: 'integer', primaryKey: true, autoIncrement: true },
    dataSrceNam: { columnName: 'DATA_SRCE_NAM', type: 'string', size: 30, required: true },
    dbRgnNam: { columnName: 'DB_RGN_NAM', type: 'string', size: 30, required: true },
    dbNam: { columnName: 'DB_NAM', type: 'string', size: 30, required: true },
    dbSchmaNam: { columnName: 'DB_SCHMA_NAM', type: 'string', size: 30, required: true },
    perlDrvrNam: { columnName: 'PERL_DRVR_NAM', type: 'string', size: 30, required: true },
    maxDlvryRunHrs: { columnName: 'MAX_DLVRY_RUN_HRS', type: 'integer' },
    busHrStrtTme: { columnName: 'BUS_HR_STRT_TME', type: 'integer' },
    busHrEndTme: { columnName: 'BUS_HR_END_TME', type: 'integer' },
    busDays: { columnName: 'BUS_DAYS', type: 'string', size: 10 },
    busMaxDlvryRunCnt: { columnName: 'BUS_MAX_DLVRY_RUN_CNT', type: 'integer' },
    maxDlvryRunCnt: { columnName: 'MAX_DLVRY_RUN_CNT', type: 'integer' },
    lstUpdtId: { columnName: 'LST_UPDT_ID', type: 'string', size: 60, required: true },
    lstUpdtTstmp: { columnName: 'LST_UPDT_TSTMP', type: 'datetime', required: true }
  },

  beforeValidate: function(values, cb){
    values.lstUpdtTstmp = new Date();
    cb(null, values);
  }
};
