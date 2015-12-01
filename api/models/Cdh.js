/**
* Cdh.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'CDH',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
   idCol: { columnName: 'ID_COL', type: 'integer', primaryKey: true, autoIncrement: true },
   strval: { columnName: 'STRVAL', type: 'string', size: 80 },
   numval: { columnName: 'NUMVAL', type: 'float' },
   dateval: { columnName: 'DATEVAL', type: 'datetime' }
  }
};
