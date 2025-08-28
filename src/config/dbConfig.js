// arquivo: /config/dbConfig.js
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false, // Mude para true se estiver usando Azure SQL
        trustServerCertificate: true // Mude para false em produção com certificado válido
    },
    requestTimeout: 65000
};

module.exports = dbConfig;