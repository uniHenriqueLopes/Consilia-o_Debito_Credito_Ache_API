// arquivo: /querys/conciliacaoQuerys.js

function buildQuery(whereClause) {
  return `
    WITH VendasUni AS (
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
      GROUP BY 
        NotaSaida.Num_Nota,
        NotaSaida.Status,
        NotaSaida.Cod_PedCliPde,
        NotaSaida.Cod_Pedido,
        NotaSaida.Dat_Emissao,
        Produto.Codigo,
        Produto.Descricao,
        Produto.Cod_EAN,
        Fabricante.Fantasia,
        NotaSaidaItens.Qtd_Produto,
        NotaSaidaItens.Prc_Unitario,
        NotaSaidaItens.Vlr_BruItem
    )

    SELECT 
      CASE 
        WHEN VendasUni.Status = 'C' AND DebitosAche.Qtde_Faturamento IS NULL THEN 'NÃO CONCILIADO'
        WHEN VendasUni.Status = 'C' THEN 'CONCILIADO'
        WHEN DebitosAche.Numero_NF IS NOT NULL AND VendasUni.Num_Nota IS NULL THEN 'NÃO FATURADA'
        WHEN DebitosAche.Numero_NF IS NULL  THEN 'NÃO CONCILIADO' -- Caso a nota não exista
        ELSE 'CONCILIADO'
      END AS [Status],
      DebitosAche.Numero_NF AS [Nota_Ache],
      VendasUni.Num_Nota,
      CASE 
        WHEN VendasUni.Status = 'F' THEN 'FECHADA'
        WHEN VendasUni.Status = 'C' THEN 'CANCELADA'
        WHEN VendasUni.Status = 'A' THEN 'ABERTA'
      END AS [Status_NF],
      VendasUni.Pedido_OL,
      VendasUni.Pedido_Venda,
      VendasUni.Dat_Emissao,
      VendasUni.codigo_Produto,
      VendasUni.Nome_Produto,
      VendasUni.Cod_EAN,
      VendasUni.Fabricante,
      DebitosAche.Qtde_Faturamento AS [Qtd_Faturada_Ache],
      VendasUni.Qtd_Produto AS [Quantidade_Produto_Uni],
      VendasUni.Prc_Unitario AS [Preço_Unitario_UNI],
      VendasUni.Vlr_BruItem AS [Valor_Total_UNI],
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
      RIGHT JOIN VendasUni 
        ON VendasUni.Num_Nota = DebitosAche.Numero_NF  
        AND VendasUni.Cod_EAN COLLATE Latin1_General_CI_AS = DebitosAche.Cod_EAN COLLATE Latin1_General_CI_AS
    GROUP BY
      VendasUni.Num_Nota,
      VendasUni.Status,
      VendasUni.Pedido_OL,
      VendasUni.Pedido_Venda,
      VendasUni.Dat_Emissao,
      VendasUni.codigo_Produto,
      VendasUni.Nome_Produto,
      VendasUni.Cod_EAN,
      VendasUni.Fabricante,
      VendasUni.Qtd_Produto,
      DebitosAche.Qtde_Faturamento,
      VendasUni.Prc_Unitario,
      VendasUni.Vlr_BruItem,
      DebitosAche.RF_Ajuste_Tributario,
      DebitosAche.Valor_Bruto,
      DebitosAche.Valor_Debito_Bruto,
      DebitosAche.prct_Desconto,
      DebitosAche.prct_Desconto_Padrao,
      DebitosAche.Valor_Debito_Final,
      DebitosAche.prct_Custo_Margem,
      DebitosAche.prct_Debito,
      DebitosAche.RF_Aliquota_Interestadual,
      DebitosAche.RF_PISCofins,
      DebitosAche.RF_RedutorICMS,
      DebitosAche.Numero_NF
  `;
}

// Exportando diferentes variações da consulta
const queries = {
  getAll: buildQuery(`NotaSaida.Dat_Emissao > '2025-04-01'`),

  getByDateRange: buildQuery(`NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim`),

  getByDateAndNota: buildQuery(`
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `),

  getByDateAndPedidoOl: buildQuery(`
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND NotaSaida.Cod_PedCliPde LIKE @pedidoOl
  `),

  getByDateAndProduto: buildQuery(`
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND Produto.Descricao LIKE @produto
  `)
};

module.exports = queries;
