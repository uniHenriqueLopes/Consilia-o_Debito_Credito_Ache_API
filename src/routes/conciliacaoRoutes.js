// arquivo: /routes/conciliacaoRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/conciliacaoController');

// (Placeholder para o middleware de upload, caso implemente a importação)
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });


// ==========================================================
// ROTA DE FILTRO AVANÇADO
// ==========================================================
// Um único endpoint POST para lidar com TODAS as combinações de filtros.
// O front-end envia um JSON com os filtros desejados no corpo da requisição.
router.post('/filtrar', controller.findByFilters);


// ==========================================================
// ROTAS DE CRUD PADRÃO
// ==========================================================

// Buscar todos os registros (sem filtros complexos)
router.get('/', controller.getAll);

// Buscar um registro específico pelo ID
router.get('/:id', controller.getById);

// Criar um novo registro (se necessário, geralmente a criação virá da importação)
// router.post('/', controller.create); // Descomente se precisar de uma rota para criação manual

// Atualizar um registro existente
// router.put('/:id', controller.update); // Descomente se a edição for permitida

// Excluir um registro
// router.delete('/:id', controller.delete); // Descomente se a exclusão for permitida


// ==========================================================
// ROTA DE IMPORTAÇÃO (Exemplo)
// ==========================================================
// router.post('/importar/csv', upload.single('file'), controller.importCsv);


module.exports = router;