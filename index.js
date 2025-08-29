// arquivo: server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conciliacaoRoutes = require('./src/routes/conciliacaoRoutes');
const uploadRoutes = require('./src/routes/fileUploadRoutes');

const app = express();
const port = process.env.PORT || 3005;

// Middlewares
app.use(cors()); // Permite requisições de outras origens (seu front-end)
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Rota principal da API
app.use('/api/conciliacoes', conciliacaoRoutes);
app.use('/api', uploadRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.send('API de Conciliação está no ar!');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});