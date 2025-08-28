// arquivo: /database/db.js
const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Conectado ao SQL Server');
        return pool;
    })
    .catch(err => console.error('Falha na conexão com o banco de dados', err));

module.exports = {
    sql,
    poolPromise
};