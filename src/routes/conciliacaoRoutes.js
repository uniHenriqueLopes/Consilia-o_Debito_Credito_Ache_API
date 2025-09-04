const express = require('express');
const router = express.Router();
const controller = require('../controllers/conciliacaoController');

// ==========================================================
// ROTA DE FILTRO AVANÇADO
// ==========================================================
// POST /filtrar
// Esta rota aceita um JSON no corpo com os seguintes campos:
// - dataInicio: string (obrigatório)
// - dataFim: string (obrigatório)
// - pedidoOl: string (opcional)
// - numeroNota: string (opcional)
// - produto: string (opcional)
router.post('/filtrar', controller.findByFilters);


// ==========================================================
// ROTAS DE CRUD PADRÃO
// ==========================================================

// Buscar todos os registros (sem filtros complexos)
router.get('/', controller.getAll);

// Buscar um registro específico pelo ID
router.get('/:id', controller.getById);

// Criar um novo registro (caso necessário)
// router.post('/', controller.create);

// Atualizar um registro existente
// router.put('/:id', controller.update);

// Excluir um registro
// router.delete('/:id', controller.delete);


// ==========================================================
// ROTA DE IMPORTAÇÃO (Exemplo)
// ==========================================================
// router.post('/importar/csv', upload.single('file'), controller.importCsv);


module.exports = router;
