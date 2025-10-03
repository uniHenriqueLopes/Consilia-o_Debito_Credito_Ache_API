// arquivo: /repositories/conciliacaoRepository.js
const { sql, poolPromise } = require('../database/db');
const queries = require('../querys/conciliacaoQuerys');
const { buildInsertArquivoQuery, buildDebitoInsertQuery, buildDebitoSelectNameQuery } = require('../querys/inserirDadosConcilicao');

class ConciliacaoRepository {

    async getAll() {
        const pool = await poolPromise;
        console.log('iniciando a query');
        const result = await pool.request().query(queries.getAll);
        console.log('finalizando');
        return result.recordset;
    }

    async getById(id) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', id)
            .query(queries.getById);
        return result.recordset[0];
    }

    async getByDateRange(dataInicio, dataFim) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .query(queries.getByDateRange);
        return result.recordset;
    }

    // Repositorio do filtro do Pedido OL
    async getByDateAndPedidoOl(dataInicio, dataFim, pedidoOl) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('pedidoOl', sql.VarChar, `%${pedidoOl}%`)
            .query(queries.getByDateAndPedidoOl);
        return result.recordset;
    }

    // Repositorio do filtro do Numero da NF
    async getByDateAndNota(dataInicio, dataFim, numeroNota) {

        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('numeroNota', sql.VarChar, `%${numeroNota}%`)
            .query(queries.getByDateAndNota);
        return result.recordset;
    }

    // Repositorio do filtro do Pedido de venda
    async getDatePedidoVenda(dataInicio, dataFim, pedidoVenda) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('pedidoVenda', sql.VarChar, `%${pedidoVenda}%`)
            .query(queries.getByDateAndPedidoVenda);
        return result.recordset;
    }
    // Repositorio do filtro por produto
    async getByDateAndProduto(dataInicio, dataFim, produto) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('produto', sql.VarChar, `%${produto}%`)
            .query(queries.getByDateAndProduto);

        return result.recordset;
    }

    // ==========================================================
    // MÉTODOS ADICIONADOS PARA FILTROS COMBINADOS
    // ==========================================================

    // Repositórios para filtros combinados (2 campos)
    async getDatePedidoOlPedidoVenda(dataInicio, dataFim, pedidoOl, pedidoVenda) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('pedidoOl', sql.VarChar, `%${pedidoOl}%`)
            .input('pedidoVenda', sql.VarChar, `%${pedidoVenda}%`)
            .query(queries.getByDataAndPedidoVendaAndPedidoOl);
        return result.recordset;
    }

    async getByDateNotaPedidoOl(dataInicio, dataFim, pedidoOl, numeroNota) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('pedidoOl', sql.VarChar, `%${pedidoOl}%`)
            .input('numeroNota', sql.VarChar, `%${numeroNota}%`)
            .query(queries.getByDataAndPedidoOlAndNota);
        return result.recordset;
    }

    async getDatePedidoOlProduto(dataInicio, dataFim, pedidoOl, produto) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('pedidoOl', sql.VarChar, `%${pedidoOl}%`)
            .input('produto', sql.VarChar, `%${produto}%`)
            .query(queries.getByDataAndPedidoOlProduto);
        return result.recordset;
    }

    async getDatePedidoVendaNf(dataInicio, dataFim, pedidoVenda, numeroNota) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('pedidoVenda', sql.VarChar, `%${pedidoVenda}%`)
            .input('numeroNota', sql.VarChar, `%${numeroNota}%`)
            .query(queries.getByDataAndPedidoVendaAndNota);
        return result.recordset;
    }

    async getDatePedidoVendaProduto(dataInicio, dataFim, pedidoVenda, produto) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('pedidoVenda', sql.VarChar, `%${pedidoVenda}%`)
            .input('produto', sql.VarChar, `%${produto}%`)
            .query(queries.getByDataAndPedidoVendaAndProduto);
        return result.recordset;
    }

    async getByDateNotaProduto(dataInicio, dataFim, numeroNota, produto) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('numeroNota', sql.VarChar, `%${numeroNota}%`)
            .input('produto', sql.VarChar, `%${produto}%`)
            .query(queries.getByDataAndNotaAndProduto);
        return result.recordset;
    }


    // Repositórios para filtros combinados (3 campos)
    async getDatePedidoOlPedidoVendaNf(dataInicio, dataFim, pedidoOl, pedidoVenda, numeroNota) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('pedidoOl', sql.VarChar, `%${pedidoOl}%`)
            .input('pedidoVenda', sql.VarChar, `%${pedidoVenda}%`)
            .input('numeroNota', sql.VarChar, `%${numeroNota}%`)
            .query(queries.getByDataAndPedidoOlPedidoVendaNota);
        return result.recordset;
    }

    async getDatePedidoOlPedidoVendaProduto(dataInicio, dataFim, pedidoOl, pedidoVenda, produto) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('pedidoOl', sql.VarChar, `%${pedidoOl}%`)
            .input('pedidoVenda', sql.VarChar, `%${pedidoVenda}%`)
            .input('produto', sql.VarChar, `%${produto}%`)
            .query(queries.getByDataAndPedidoOlPedidoVendaProduto);
        return result.recordset;
    }

    async getDatePedidoVendaProdutoNf(dataInicio, dataFim, pedidoVenda, produto, numeroNota) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('pedidoVenda', sql.VarChar, `%${pedidoVenda}%`)
            .input('produto', sql.VarChar, `%${produto}%`)
            .input('numeroNota', sql.VarChar, `%${numeroNota}%`)
            .query(queries.getByDataAndPedidoVendaNotaProduto);
        return result.recordset;
    }


    // Repositório para filtro combinado (4 campos)
    async getDatePedidoOlPedidoVendaNfProduto(dataInicio, dataFim, pedidoOl, pedidoVenda, numeroNota, produto) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('pedidoOl', sql.VarChar, `%${pedidoOl}%`)
            .input('pedidoVenda', sql.VarChar, `%${pedidoVenda}%`)
            .input('numeroNota', sql.VarChar, `%${numeroNota}%`)
            .input('produto', sql.VarChar, `%${produto}%`)
            .query(queries.getByAllFilters);
        return result.recordset;
    }

    async create(data) {

        try {

            const pool = await poolPromise;
            const request = pool.request();

            // Mapeamento e parse dos dados para tipos corretos
            request.input('idDataIngestion', sql.Int, data.idDataIngestion);
            request.input('Cod_EAN', sql.VarChar, data.EAN);
            request.input('Apresentacao', sql.VarChar, data.Apresentacao);
            request.input('CNPJ_Distribuidor', sql.VarChar, data.CNPJ_Distribuidor);
            request.input('Numero_NF', sql.VarChar, data.Numero_NF);
            request.input('Qtde_Faturamento', sql.Int, parseInt(data.Qtd_Faturada));
            request.input('Valor_Bruto', sql.Decimal(18, 2), parseFloat(data.Valor_Bruto));
            request.input('prct_Desconto', sql.Decimal(5, 2), parseFloat(data.prct_Desconto));
            request.input('prct_Desconto_Padrao', sql.Decimal(5, 2), parseFloat(data.prct_Desconto_Padrao));
            request.input('prct_Custo_Margem', sql.Decimal(5, 2), parseFloat(data.prct_Custo_Margem));
            request.input('prct_Debito', sql.Decimal(5, 2), parseFloat(data.prct_Debito));
            request.input('Valor_Debito_Bruto', sql.Decimal(18, 2), parseFloat(data.Valor_Debito_Bruto));
            request.input('prct_Repasse_ICMS', sql.Decimal(5, 2), 0); // fixo conforme seu padrão
            request.input('Valor_Repasse_ICMS', sql.Decimal(18, 2), 0); // fixo
            request.input('Valor_Debito_Final', sql.Decimal(18, 2), parseFloat(data.Valor_Debito_Final));
            request.input('RF_Ajuste_Tributario', sql.Decimal(18, 2), parseFloat(data.RF_Ajuste_Tributario));
            request.input('RF_Valor_Debito', sql.Decimal(18, 2), parseFloat(data.Valor_Debito_Final)); // igual ao valor final
            request.input('RF_Aliquota_Interestadual', sql.Decimal(5, 2), parseFloat(data.RF_Aliquota_Interestadual));
            request.input('RF_PISCofins', sql.Decimal(5, 2), parseFloat(data.RF_PISCofins));

            // Trata campo vazio de RF_RedutorICMS
            const redutorICMS = data.RF_RedutorICMS?.trim();
            request.input('RF_RedutorICMS', sql.Decimal(5, 2), redutorICMS ? parseFloat(redutorICMS) : 0);

            // Executa a query
            const query = buildDebitoInsertQuery();
            await request.query(query);

        } catch (error) {

            console.error(error.message);  // Exibe a mensagem de erro
            return error.message  // Pode propagar o erro, caso deseje tratar em outro lugar

        }

    }

    async insertDataIngestion(nomeArquivo) {
        const pool = await poolPromise;
        const request = pool.request();

        const dataImportacao = new Date();

        request.input('nomeArquivo', sql.VarChar, nomeArquivo);
        request.input('dataImportacao', sql.DateTime, dataImportacao);

        const result = await request.query(buildInsertArquivoQuery());
        return result.recordset[0].id;
    }

    async selectDataIngestionName(nomeArquivo) {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('nomeArquivo', sql.VarChar, nomeArquivo);

        const result = await request.query(buildDebitoSelectNameQuery());
        return result.recordset[0];
    }


    async update(id, data) {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('id', sql.Int, id);
        Object.keys(data).forEach(key => {
            request.input(key, data[key]);
        });
        await request.query(queries.update);
    }

    async delete(id) {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, id)
            .query(queries.delete);
    }
}

module.exports = new ConciliacaoRepository();



