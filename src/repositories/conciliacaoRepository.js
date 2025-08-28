// arquivo: /repositories/conciliacaoRepository.js
const { sql, poolPromise } = require('../database/db');
const queries = require('../querys/conciliacaoQuerys');

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

    async getDate(dataInicio, dataFim) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .query(queries.getData);
        return result.recordset;
    }

    // Repositorio do filtro do Pedido OL
    async getDatePedidoOl(dataInicio, dataFim, pedidoOl) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('pedidoOl', sql.VarChar, `%${pedidoOl}%`)
            .query(queries.getDatePedidoOl);
        return result.recordset;
    }

    // Repositorio do filtro do Numero da NF
    async getDateNf(dataInicio, dataFim, numeroNota) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('numeroNota', sql.VarChar, `%${numeroNota}%`)
            .query(queries.getDateNF);
        return result.recordset;
    }

    // Repositorio do filtro do Pedido de venda
    async getDatePedidoVenda(dataInicio, dataFim, pedidoVenda) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('pedidoVenda', sql.VarChar, `%${pedidoVenda}%`)
            .query(queries.getDatePedidoVenda);
        return result.recordset;
    }
    // Repositorio do filtro por produto
    async getDateProduto(dataInicio, dataFim, produto) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('produto', sql.VarChar, `%${produto}%`)
            .query(queries.getDateProduto);
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
            .query(queries.getDatePedidoOlPedidoVenda);
        return result.recordset;
    }

    async getDatePedidoOlNf(dataInicio, dataFim, pedidoOl, numeroNota) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('pedidoOl', sql.VarChar, `%${pedidoOl}%`)
            .input('numeroNota', sql.VarChar, `%${numeroNota}%`)
            .query(queries.getDatePedidoOlNf);
        return result.recordset;
    }

    async getDatePedidoOlProduto(dataInicio, dataFim, pedidoOl, produto) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('pedidoOl', sql.VarChar, `%${pedidoOl}%`)
            .input('produto', sql.VarChar, `%${produto}%`)
            .query(queries.getDatePedidoOlProduto);
        return result.recordset;
    }

    async getDatePedidoVendaNf(dataInicio, dataFim, pedidoVenda, numeroNota) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('pedidoVenda', sql.VarChar, `%${pedidoVenda}%`)
            .input('numeroNota', sql.VarChar, `%${numeroNota}%`)
            .query(queries.getDatePedidoVendaNf);
        return result.recordset;
    }

    async getDatePedidoVendaProduto(dataInicio, dataFim, pedidoVenda, produto) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('pedidoVenda', sql.VarChar, `%${pedidoVenda}%`)
            .input('produto', sql.VarChar, `%${produto}%`)
            .query(queries.getDatePedidoVendaProduto);
        return result.recordset;
    }

    async getDateNfProduto(dataInicio, dataFim, numeroNota, produto) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('numeroNota', sql.VarChar, `%${numeroNota}%`)
            .input('produto', sql.VarChar, `%${produto}%`)
            .query(queries.getDateNfProduto);
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
            .query(queries.getDatePedidoOlPedidoVendaNf);
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
            .query(queries.getDatePedidoOlPedidoVendaProduto);
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
            .query(queries.getDatePedidoVendaProdutoNf);
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
            .query(queries.getDatePedidoOlPedidoVendaNfProduto);
        return result.recordset;
    }
    
    async create(data) {
        const pool = await poolPromise;
        const request = pool.request();
        // Mapeia os dados para os parâmetros da query
        Object.keys(data).forEach(key => {
            // Adapte os tipos de dados conforme sua tabela
            request.input(key, data[key]);
        });
        await request.query(queries.create);
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



