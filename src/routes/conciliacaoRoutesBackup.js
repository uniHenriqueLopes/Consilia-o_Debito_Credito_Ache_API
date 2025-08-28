// arquivo: /routes/conciliacaoRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/conciliacaoController');

// Mapeia as rotas para os métodos do controller
router.get('/', controller.getAll);
router.post('/intervalo', controller.getData);
router.post('/pedidoOl', controller.getDatePedidoOl);
router.post('/NF', controller.getDateNf);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/:id', controller.getById);

// Importação
// router.post('/import/csv', upload.single('file'), controller.importCsv);



module.exports = router;