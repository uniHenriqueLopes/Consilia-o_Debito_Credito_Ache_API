// arquivo: /querys/conciliacaoQuerys.js
const conciliacaoWhereClauses = require('./conciliacaoWhereClauses')

function buildQuery(whereClause) {
  return `
    -- CTE para as Vendas do Ceará (Uni Ceará)
WITH VendasUniCE AS (
    SELECT 
        NotaSaida.Status AS [Status],
        NotaSaida.Cod_PedCliPde AS [Pedido_OL],
        NotaSaida.Cod_Pedido AS [Pedido_Venda],
        NotaSaida.Num_Nota,
        CASE 
            WHEN NotaSaida.Status = 'F' THEN 'FECHADA'
            WHEN NotaSaida.Status = 'C' THEN 'CANCELADA'
            WHEN NotaSaida.Status = 'A' THEN 'ABERTA'
        END AS [Status_NF],
        CONVERT(DATE, NotaSaida.Dat_Emissao) AS [Dat_Emissao],
        Produto.Codigo AS [codigo_Produto],
        Produto.Descricao AS [Nome_Produto],
        Produto.Cod_EAN,
        Fabricante.Fantasia AS [Fabricante],
        NotaSaidaItens.Qtd_Produto,
        NotaSaidaItens.Prc_Unitario,
        NotaSaidaItens.Vlr_BruItem,
        'Uni Ceará' AS [Empresa]
    FROM 
        [UNI_CEARA].DMD.dbo.NFSCB NotaSaida
        INNER JOIN [UNI_CEARA].DMD.dbo.PDECB PedidoEletronico 
            ON PedidoEletronico.Cod_PedCli = NotaSaida.Cod_PedCliPde
        INNER JOIN [UNI_CEARA].DMD.dbo.NFSIT NotaSaidaItens 
            ON NotaSaidaItens.Num_Nota = NotaSaida.Num_Nota
        LEFT JOIN [UNI_CEARA].DMD.dbo.PRODU Produto 
            ON Produto.Codigo = NotaSaidaItens.Cod_Produto
        INNER JOIN [UNI_CEARA].DMD.dbo.FABRI Fabricante
            ON Fabricante.Codigo = Produto.Cod_Fabricante
    WHERE 
        Fabricante.Fantasia LIKE '%ach%'
        AND ${whereClause}
),
VendasUniPE AS (
    SELECT 
        NotaSaida.Status AS [Status],
        NotaSaida.Cod_PedCliPde AS [Pedido_OL],
        NotaSaida.Cod_Pedido AS [Pedido_Venda],
        NotaSaida.Num_Nota,
        CASE 
            WHEN NotaSaida.Status = 'F' THEN 'FECHADA'
            WHEN NotaSaida.Status = 'C' THEN 'CANCELADA'
            WHEN NotaSaida.Status = 'A' THEN 'ABERTA'
        END AS [Status_NF],
        CONVERT(DATE, NotaSaida.Dat_Emissao) AS [Dat_Emissao],
        Produto.Codigo AS [codigo_Produto],
        Produto.Descricao AS [Nome_Produto],
        Produto.Cod_EAN,
        Fabricante.Fantasia AS [Fabricante],
        NotaSaidaItens.Qtd_Produto,
        NotaSaidaItens.Prc_Unitario,
        NotaSaidaItens.Vlr_BruItem,
        'Uni Hospitalar' AS [Empresa]
    FROM 
        DMD.dbo.NFSCB NotaSaida
        INNER JOIN DMD.dbo.PDECB PedidoEletronico 
            ON PedidoEletronico.Cod_PedCli = NotaSaida.Cod_PedCliPde
        INNER JOIN DMD.dbo.NFSIT NotaSaidaItens 
            ON NotaSaidaItens.Num_Nota = NotaSaida.Num_Nota
        LEFT JOIN DMD.dbo.PRODU Produto 
            ON Produto.Codigo = NotaSaidaItens.Cod_Produto
        INNER JOIN DMD.dbo.FABRI Fabricante
            ON Fabricante.Codigo = Produto.Cod_Fabricante
    WHERE 
        Fabricante.Fantasia LIKE '%ach%'
        AND ${whereClause}
),
-- Agrupando produtos repetidos (mesmo EAN e mesma nota)
VendasAgrupadas AS (
    SELECT
        Status,
        Pedido_OL,
        Pedido_Venda,
        Num_Nota,
        Status_NF,
        Dat_Emissao,
        codigo_Produto,
        Nome_Produto,
        Cod_EAN,
        Fabricante,
        Empresa,
        SUM(Qtd_Produto) AS Qtd_Produto, -- soma quantidade
        AVG(Prc_Unitario) AS Prc_Unitario, -- média de preço unitário (caso varie)
        SUM(Vlr_BruItem) AS Vlr_BruItem    -- soma valor total
    FROM (
        SELECT * FROM VendasUniCE
        UNION ALL
        SELECT * FROM VendasUniPE
    ) AS TodasVendas
    GROUP BY
        Status,
        Pedido_OL,
        Pedido_Venda,
        Num_Nota,
        Status_NF,
        Dat_Emissao,
        codigo_Produto,
        Nome_Produto,
        Cod_EAN,
        Fabricante,
        Empresa
)
SELECT 
    CASE 
        WHEN Vendas.Status = 'C' AND DebitosAche.Qtde_Faturamento IS NULL THEN 'NÃO CONCILIADO'
        WHEN Vendas.Status = 'C' THEN 'CONCILIADO' 
        WHEN DebitosAche.Numero_NF IS NOT NULL AND Vendas.Num_Nota IS NULL THEN 'NÃO FATURADA' 
        WHEN DebitosAche.Numero_NF IS NULL THEN 'NÃO CONCILIADO'
        ELSE 'CONCILIADO' 
    END AS [Status],
    DebitosAche.Numero_NF AS [Nota_Ache],
    Vendas.Num_Nota,
    Vendas.Empresa,
    Vendas.Status_NF,
    Vendas.Pedido_OL,
    Vendas.Pedido_Venda,
    Vendas.Dat_Emissao,
    Vendas.codigo_Produto,
    Vendas.Nome_Produto,
    Vendas.Cod_EAN,
    Vendas.Fabricante,
    DebitosAche.Qtde_Faturamento AS [Qtd_Faturada_Ache],
    Vendas.Qtd_Produto AS [Quantidade_Produto_Uni],
    Vendas.Prc_Unitario AS [Preço_Unitario_UNI],
    Vendas.Vlr_BruItem AS [Valor_Total_UNI],
    DebitosAche.Valor_Debito_Final,
    DebitosAche.Valor_Bruto,
    DebitosAche.Valor_Debito_Bruto,
    DebitosAche.RF_Ajuste_Tributario,
    DebitosAche.prct_Desconto,
    DebitosAche.prct_Desconto_Padrao,
    DebitosAche.prct_Custo_Margem,
    DebitosAche.prct_Debito,
    DebitosAche.RF_Aliquota_Interestadual,
    DebitosAche.RF_PISCofins,
    DebitosAche.RF_RedutorICMS
FROM 
    UHCDB.DBO.DebitosAche 
RIGHT JOIN VendasAgrupadas AS Vendas
    ON Vendas.Num_Nota = DebitosAche.Numero_NF 
    AND Vendas.Cod_EAN COLLATE Latin1_General_CI_AS = DebitosAche.Cod_EAN COLLATE Latin1_General_CI_AS;
    `;
}

// Exportando diferentes variações da consulta
const queries = {

  //------------------QUERYS DE 1 FILTRO ----------------------//

  getAll: buildQuery(`NotaSaida.Dat_Emissao > '2025-04-01'`),

  //Bucar por intervalo de dadar
  getByDateRange: buildQuery(`NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim`),


  // Filtro: Data + Número da Nota Fiscal
  getByDateAndNota: buildQuery(conciliacaoWhereClauses.data_nota),

  // Filtro: Data + Pedido de Venda
  getByDateAndPedidoVenda: buildQuery(conciliacaoWhereClauses.data_pedidoVenda),

  // Filtro: Data + Pedido OL
  getByDateAndPedidoOl: buildQuery(conciliacaoWhereClauses.data_pedidoOl),

  // Filtro: Data + Produto
  getByDateAndProduto: buildQuery(conciliacaoWhereClauses.data_produto),

  //------------------------QUERYS COM 2 filtros PEDIDOS OL ------------------------//

  //Pedido de OL + Nota
  getByDataAndPedidoOlAndNota: buildQuery(conciliacaoWhereClauses.data_pedidoOl_nota),

  //Pedido de OL + Produtos
  getByDataAndPedidoOlProduto: buildQuery(conciliacaoWhereClauses.data_pedidoOl_produto),

  //Pedido de OL + Pedido de vendas
  getByDataAndPedidoVendaAndPedidoOl: buildQuery(conciliacaoWhereClauses.data_pedidoOl_pedidoVenda),


  // -----------------------QUERY COM 2 filtros PEDIDOS DE VENDAS --------------------------//
  //Pedido de vendas + Nota
  getByDataAndPedidoVendaAndNota: buildQuery(conciliacaoWhereClauses.data_pedidoVenda_nota),

  //Pedido de vendas + Produtos
  getByDataAndPedidoVendaAndProduto: buildQuery(conciliacaoWhereClauses.data_pedidoVenda_produto),

  // -----------------------QUERY COM 2 filtros NotaFiscal --------------------------//
  // Filtro: Data + Nota + Produto
  getByDataAndNotaAndProduto:buildQuery(conciliacaoWhereClauses.data_nota_produto),

  // -----------------------QUERY COM 3 filtros --------------------------//

  // Data + Pedido de Venda + Nota + Produto
  getByDataAndPedidoVendaNotaProduto: buildQuery(conciliacaoWhereClauses.data_pedidoVenda_produto_nota),

  // Data + Pedido OL + Nota + Produto
  getByDataAndPedidoOlNotaProduto: buildQuery(conciliacaoWhereClauses.data_pedidoOl_produto_nota),

  // Data + Pedido OL + Pedido de Venda + Produto
  getByDataAndPedidoOlPedidoVendaProduto: buildQuery(conciliacaoWhereClauses.data_pedidoOl_pedidoVenda_produto),

  // Data + Pedido OL + Pedido de Venda + Nota
  getByDataAndPedidoOlPedidoVendaNota: buildQuery(conciliacaoWhereClauses.data_pedidoOl_pedidoVenda_nota),

  // Data + Pedido OL + Pedido de Venda + Nota + Produto
  getByAllFilters: buildQuery(conciliacaoWhereClauses.data_pedidoOl_pedidoVenda_produto_nota),
};

module.exports = queries;
