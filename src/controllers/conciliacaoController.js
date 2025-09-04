const repository = require('../repositories/conciliacaoRepository');

class ConciliacaoController {
  /**
   * Endpoint para busca com filtros dinâmicos
   */
  async findByFilters(req, res) {
    try {
      const {
        dataInicio,
        dataFim,
        pedidoOl,
        numeroNota,
        produto
      } = req.body;

      if (!dataInicio || !dataFim) {
        return res.status(400).json({ message: 'Os campos dataInicio e dataFim são obrigatórios.' });
      }

      let dados;

      // Filtragens combinadas (mais específicos para mais genéricos)
      if (pedidoOl && numeroNota && produto) {
        dados = await repository.getByDateNotaProduto(dataInicio, dataFim, numeroNota, produto); // Exemplo
      } else if (numeroNota && produto) {
        dados = await repository.getByDateNotaProduto(dataInicio, dataFim, numeroNota, produto);
      } else if (numeroNota) {
        dados = await repository.getByDateAndNota(dataInicio, dataFim, numeroNota);
      } else if (pedidoOl) {
        dados = await repository.getByDateAndPedidoOl(dataInicio, dataFim, pedidoOl);
      } else if (produto) {
        dados = await repository.getByDateAndProduto(dataInicio, dataFim, produto);
      } else {
        dados = await repository.getByDateRange(dataInicio, dataFim);
      }

      res.status(200).json(dados);

    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar registros com filtros.', error: error.message });
    }
  }

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
