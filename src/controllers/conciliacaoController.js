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
        produto,
        pedidoVenda,
        empresa
      } = req.body;

      if (!dataInicio || !dataFim) {
        return res.status(400).json({ message: 'Os campos dataInicio e dataFim são obrigatórios.' });
      }

      let dados;

      // Filtragens combinadas (mais específicos para mais genéricos)
      if (pedidoOl && numeroNota && produto) {
        dados = await repository.getByDateNotaPedidoOl(dataInicio, dataFim, numeroNota, produto); // Exemplo
      } else if (numeroNota && produto) {
        dados = await repository.getByDateNotaProduto(dataInicio, dataFim, numeroNota, produto);
      } else if (numeroNota) {
        dados = await repository.getByDateAndNota(dataInicio, dataFim, numeroNota);
      } else if (pedidoOl) {
        dados = await repository.getByDateAndPedidoOl(dataInicio, dataFim, pedidoOl);
      } else if (produto) {
        dados = await repository.getByDateAndProduto(dataInicio, dataFim, produto);
      } else if (pedidoVenda) {
        dados = await repository.getDatePedidoVenda(dataInicio, dataFim, pedidoVenda);
      // } else if (empresa) {
      // console.log('teste de filtro')
      } else {
        dados = await repository.getByDateRange(dataInicio, dataFim);
      }

      res.status(200).json(dados);

    } catch (error) {
      console.log(error)
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


  /**
  * Criação de novo registro (insert)
  */
  async create(req, res) {
    try {
      const data = req.body;

      // Validação básica
      if (!data) {
        return res.status(400).json({ message: 'Dados obrigatórios não fornecidos.' });
      }

      await repository.create(data);

      res.status(201).json({ message: 'Registro inserido com sucesso.' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao inserir registro.', error: error.message });
    }
  }

  // ⬇️ NOVO MÉTODO: Importação em lote
  async importarLote(req, res) {
    try {
      const { nomeArquivo, registros } = req.body;

      // Percorre o CSV e cria um Array com os dados do arquivo
      if (!Array.isArray(registros) || registros.length === 0 || !nomeArquivo) {
        return res.status(400).json({ message: 'Nome do arquivo e registros são obrigatórios.' });
      }

      //Tenta encontrar o nome do arquivo no banco de dados do UHC
      const DataIngestionValidate = await repository.selectDataIngestionName(nomeArquivo);

      //Valida se o arquivo já foi importado para o sistema anteriormente
      if (DataIngestionValidate) {

        return res.status(433).json({ message: `O arquivo ${DataIngestionValidate.name} já existe no sistema` });

        //Valida caso o arquivo não exista no banco de dados ele faz o processo de registro
      } else if (DataIngestionValidate == undefined) {

        // Insere na tabela DataIngestion e obtém o ID
        const idDataIngestion = await repository.insertDataIngestion(nomeArquivo);

        for (const item of registros) {
          item.idDataIngestion = idDataIngestion; // adiciona para ser usado na inserção do débito
          await repository.create(item);
        }

        res.status(201).json({ message: 'Importação realizada com sucesso.' });
      }
    } catch (error) {
      // caso ocorra algum erro desconnhecido ele entra nessa excessão
      console.error('Erro na importação:', error);
      res.status(500).json({ message: 'Erro ao importar dados.', error: error});
    }
  }


}

module.exports = new ConciliacaoController();
