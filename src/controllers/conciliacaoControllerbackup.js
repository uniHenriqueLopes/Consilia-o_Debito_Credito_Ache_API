// arquivo: /controllers/conciliacaoController.js
const repository = require('../repositories/conciliacaoRepository');
// const fs = require('fs');
// const csv = require('fast-csv');

class ConciliacaoController {
    // READ (GET ALL)
    async getAll(req, res) {
        try {
            const data = await repository.getAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar registros.', error: error.message });
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
            res.status(500).json({ message: 'Erro ao buscar registro.', error: error.message });
        }
    }

    //medoto criado para puxar a tabela apenas com filtro de data
    async getData(req, res) {
        try {
            const {dataInicio,dataFim} = req.body

            const dados = await repository.getDate(dataInicio,dataFim);

            res.status(200).json(dados)
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar registro.', error: error.message });
        }
    }

    //medoto criado para puxar a tabela apenas com filtro de data e numero do pedido OL
    async getDatePedidoOl(req, res) {
        try {
            const {dataInicio,dataFim,pedidoOl} = req.body

            const dados = await repository.getDatePedidoOl(dataInicio,dataFim,pedidoOl);

            res.status(200).json(dados)
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar registro.', error: error.message });
        }
    }
    async getDateNf(req, res) {
        try {
            const {dataInicio,dataFim,numeroNota} = req.body

            const dados = await repository.getDateNf(dataInicio,dataFim,numeroNota);

            res.status(200).json(dados)
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar registro.', error: error.message });
        }
    }
    async getDatePedidoVenda(req, res) {
        try {
            const {dataInicio,dataFim,numeroNota} = req.body

            const dados = await repository.getDatePedidoVenda(dataInicio,dataFim,pedidoVenda);

            res.status(200).json(dados)
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar registro.', error: error.message });
        }
    }
    async getDateProduto(req, res) {
        try {
            const {dataInicio,dataFim,produto} = req.body

            const dados = await repository.getDateNf(dataInicio,dataFim,produto);

            res.status(200).json(dados)
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar registro.', error: error.message });
        }
    }

    // CREATE (POST)
    async create(req, res) {
        try {
            // Validação básica do corpo da requisição
            if (Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: "Corpo da requisição não pode ser vazio." });
            }
            await repository.create(req.body);
            res.status(201).json({ message: 'Registro criado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar registro.', error: error.message });
        }
    }

    // UPDATE (PUT)
    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            // Validação básica do corpo da requisição
            if (Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: "Corpo da requisição não pode ser vazio." });
            }
            await repository.update(id, req.body);
            res.status(200).json({ message: 'Registro atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar registro.', error: error.message });
        }
    }

    // DELETE
    async delete(req, res) {
        try {
            const id = parseInt(req.params.id);
            await repository.delete(id);
            res.status(200).json({ message: 'Registro excluído com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir registro.', error: error.message });
        }
    }



    // Importação CSV simples (UTF-8, com cabeçalho compatível aos campos do create)
    async importCsv(req, res, next) {
        const filePath = req.file?.path;
        if (!filePath) return res.status(400).json({ message: 'Arquivo não enviado' });

        const createdIds = [];
        const errors = [];

        fs.createReadStream(filePath)
        .pipe(csv.parse({ headers: true, ignoreEmpty: true, trim: true }))
        .on('error', (error) => next(error))
        .on('data', async (row) => {
            try {
            // mapeie o CSV para os campos esperados pela API
            const payload = {
                Status: row.Status,
                PedidoOL: row.PedidoOL,
                PedidoVenda: row.PedidoVenda,
                NumeroNota: row.NumeroNota,
                StatusNF: row.StatusNF,
                EmissaoNF: row.EmissaoNF,
                CodigoProduto: row.CodigoProduto,
                ProdutoDescricao: row.ProdutoDescricao,
                QuantidadeOL: Number(row.QuantidadeOL || 0),
                QtdAtendidaOL: Number(row.QtdAtendidaOL || 0),
                QtdPedidoVenda: Number(row.QtdPedidoVenda || 0),
                QtdFaturada: Number(row.QtdFaturada || 0),
                QtdAche: Number(row.QtdAche || 0),
                RFValorDebito: Number(row.RFValorDebito || 0),
                RFAjusteTributario: Number(row.RFAjusteTributario || 0),
                Desconto: Number(row.Desconto || 0),
                DescPadrao: row.DescPadrao,
                DataEntradaArquivo: row.DataEntradaArquivo,
                Empresa: row.Empresa
            };
            const { id } = await this.repository.create(payload);
            createdIds.push(id);
            } catch (e) {
            errors.push({ row, error: e.message });
            }
        })
        .on('end', (rowCount) => {
            fs.unlink(filePath, () => {}); // remove o arquivo temporário
            res.json({ imported: createdIds.length, createdIds, errors, rowsRead: rowCount });
        });
        }
}

module.exports = new ConciliacaoController();