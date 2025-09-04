// arquivo: /controllers/conciliacaoController.js
const repository = require('../repositories/conciliacaoRepository');

class ConciliacaoController {
    /**
     * Método unificado para lidar com todas as consultas de filtro.
     * Ele verifica quais parâmetros foram enviados no corpo da requisição
     * e chama o método de repositório apropriado.
     */
    async findByFilters(req, res) {
        try {
            // Extrai todos os possíveis filtros do corpo da requisição
            const {
                dataInicio,
                dataFim,
                pedidoOl,
                pedidoVenda,
                numeroNota,
                produto
            } = req.body;

            let dados;

            // Lógica para decidir qual método do repositório chamar
            // Começa do mais específico (mais filtros) para o mais geral

            if (dataInicio && dataFim && pedidoOl && pedidoVenda && numeroNota && produto) {
                dados = await repository.getDatePedidoOlPedidoVendaNfProduto(dataInicio, dataFim, pedidoOl, pedidoVenda, numeroNota, produto);
            }
            // Combinações de 3 filtros + data
            else if (dataInicio && dataFim && pedidoVenda && produto && numeroNota) {
                dados = await repository.getDatePedidoVendaProdutoNf(dataInicio, dataFim, pedidoVenda, produto, numeroNota);
            } else if (dataInicio && dataFim && pedidoOl && pedidoVenda && produto) {
                dados = await repository.getDatePedidoOlPedidoVendaProduto(dataInicio, dataFim, pedidoOl, pedidoVenda, produto);
            } else if (dataInicio && dataFim && pedidoOl && pedidoVenda && numeroNota) {
                dados = await repository.getDatePedidoOlPedidoVendaNf(dataInicio, dataFim, pedidoOl, pedidoVenda, numeroNota);
            }
            // Combinações de 2 filtros + data
            else if (dataInicio && dataFim && numeroNota && produto) {
                dados = await repository.getDateNfProduto(dataInicio, dataFim, numeroNota, produto);
            } else if (dataInicio && dataFim && pedidoVenda && produto) {
                dados = await repository.getDatePedidoVendaProduto(dataInicio, dataFim, pedidoVenda, produto);
            } else if (dataInicio && dataFim && pedidoVenda && numeroNota) {
                dados = await repository.getDatePedidoVendaNf(dataInicio, dataFim, pedidoVenda, numeroNota);
            } else if (dataInicio && dataFim && pedidoOl && produto) {
                dados = await repository.getDatePedidoOlProduto(dataInicio, dataFim, pedidoOl, produto);
            } else if (dataInicio && dataFim && pedidoOl && numeroNota) {
                dados = await repository.getDatePedidoOlNf(dataInicio, dataFim, pedidoOl, numeroNota);
            } else if (dataInicio && dataFim && pedidoOl && pedidoVenda) {
                dados = await repository.getDatePedidoOlPedidoVenda(dataInicio, dataFim, pedidoOl, pedidoVenda);
            }
            // Combinações de 1 filtro + data
            else if (dataInicio && dataFim && produto) {
                dados = await repository.getDateProduto(dataInicio, dataFim, produto);
            } else if (dataInicio && dataFim && pedidoVenda) {
                dados = await repository.getDatePedidoVenda(dataInicio, dataFim, pedidoVenda);
            } else if (dataInicio && dataFim && numeroNota) {
                dados = await repository.getDateNf(dataInicio, dataFim, numeroNota);
            } else if (dataInicio && dataFim && pedidoOl) {
                dados = await repository.getDatePedidoOl(dataInicio, dataFim, pedidoOl);
            }
            // Apenas data
            else if (dataInicio && dataFim) {
                dados = await repository.getDate(dataInicio, dataFim);
            }
            // Nenhum filtro válido
            else {
                return res.status(400).json({ message: 'Por favor, forneça parâmetros de filtro válidos. O intervalo de datas (dataInicio, dataFim) é o filtro mínimo requerido.' });
            }

            res.status(200).json(dados);

        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar registros filtrados.', error: error.message });
        }
    }


    // ==========================================================
    // MÉTODOS CRUD BÁSICOS (mantidos para outras finalidades)
    // ==========================================================

    // READ (GET ALL)
    async getAll(req, res) {
        try {
            const data = await repository.getAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar todos os registros.', error: error.message });
        }
    }

    // READ (GET BY ID)
    async getById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const data = await repository.getById(id);
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: 'Registro não encontrado.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar registro por ID.', error: error.message });
        }
    }
}

module.exports = new ConciliacaoController();