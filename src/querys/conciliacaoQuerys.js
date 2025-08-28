const whereClauses = require('./conciliacaoWhereClauses');

// arquivo: /querys/conciliacaoQuerys.js
const selectColumns = `
  'Status' as [Status],
  PedidoEletronico.Cod_PedCli AS [Pedido_OL],
  PedidoVendas.Numero AS [Pedido_Venda],
  PedidoVendas.Cod_NumNfsIni as [Numero_nota],
  'status NF' as [Status_NF],
  'dataEmissão NF' as [emissão_NF],
  PedidoVendasItens.Cod_Produto as [Codigo_Produto],
  Produto.Descricao as [Produto_descricao],
  PedidoEletronicoItens.Qtd_Pedido as [quantidade_OL],
  PedidoEletronicoItens.Qtd_Atendi as [Qtd_Atendida_OL],
  PedidoVendasItens.Qtd_Pedido as [Qtd_Pedido_Venda],
  'Qtd_Faturada' as [Qtd_Faturada],
  'quantidade no arquivo Ache' as [Qtd_Ache],
  PedidoVendasItens.Prc_Unitario as [Valor_Unitario_Venda],
  'RFValorDebito' AS [RFValorDebito],
  'RFAjusteTributario' AS [RFAjusteTributario],
  '%Desconto' AS [Desconto],
  'DescPadrao' AS [Desconto],
  'DataEntradaArquivo' AS [DataEntradaArquivo],
  'Empresa' AS [Empresa]
`;

const joinTables = `
  PDECB PedidoEletronico
  INNER JOIN PDEIT PedidoEletronicoItens ON PedidoEletronicoItens.Cod_PedCli = PedidoEletronico.Cod_PedCli
  INNER JOIN PDVCB PedidoVendas ON PedidoVendas.Numero = PedidoEletronico.Num_PedVen
  INNER JOIN PDVIT PedidoVendasItens ON PedidoVendasItens.Cod_Pedido = PedidoVendas.Numero
  INNER JOIN NFSCB NotaSaida ON NotaSaida.Num_Nota = PedidoVendas.Cod_NumNfsIni
  INNER JOIN NFSIT NotaSaidaItens ON NotaSaidaItens.Num_Nota = NotaSaida.Num_Nota
  INNER JOIN PRODU Produto ON Produto.Codigo = PedidoVendasItens.Cod_Produto
`;

const groupByFields = `
  PedidoEletronico.Cod_PedCli,
  PedidoVendas.Numero,
  PedidoVendas.Cod_NumNfsIni,
  PedidoVendasItens.Cod_Produto,
  Produto.Descricao,
  PedidoEletronicoItens.Qtd_Pedido,
  PedidoEletronicoItens.Qtd_Atendi,
  PedidoVendasItens.Qtd_Pedido,
  PedidoVendasItens.Prc_Unitario
`;




function buildQuery(whereClause) {
  return `
    SELECT ${selectColumns}
    FROM ${joinTables}
    WHERE ${whereClause}
    GROUP BY ${groupByFields}
  `;
}

const queries = {
  getAll: buildQuery(`PedidoVendas.Dat_Pedido > '2025-04-01'`),

  getData: buildQuery(`PedidoVendas.Dat_Pedido BETWEEN @dataInicio AND @dataFim`),

  getDatePedidoOl: buildQuery(`
    PedidoVendas.Dat_Pedido BETWEEN @dataInicio AND @dataFim
    AND PedidoEletronico.Cod_PedCli LIKE @pedidoOl
  `),

  getDateNF: buildQuery(`
    PedidoVendas.Dat_Pedido BETWEEN @dataInicio AND @dataFim
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `),

  getDatePedidoVenda: buildQuery(`
    PedidoVendas.Dat_Pedido BETWEEN @dataInicio AND @dataFim
    AND PedidoVendas.Numero LIKE @pedidoVenda
  `),

  getDateProduto: buildQuery(`
    PedidoVendas.Dat_Pedido BETWEEN @dataInicio AND @dataFim
    AND Produto.Descricao LIKE @produto
  `),

  getDatePedidoOlPedidoVenda: buildQuery(whereClauses.data_pedidoOl_pedidoVenda),

  getDatePedidoOlNf: buildQuery(whereClauses.data_pedidoOl_nota),

  getDatePedidoOlProduto: buildQuery(whereClauses.data_pedidoOl_produto),


  getDatePedidoVendaNf: buildQuery(whereClauses.data_pedidoVenda_nota),

  getDatePedidoVendaProduto: buildQuery(whereClauses.data_pedidoVenda_produto),

  getDateNfProduto: buildQuery(whereClauses.pedidoOl_produto_nota),


  getDatePedidoOlPedidoVendaNf: buildQuery(whereClauses.data_pedidoOl_pedidoVenda_nota),

  getDatePedidoOlPedidoVendaProduto: buildQuery(whereClauses.data_pedidoOl_pedidoVenda_produto),

  getDatePedidoVendaProdutoNf: buildQuery(whereClauses.data_pedidoVenda_produto_nota),


  getDatePedidoOlPedidoVendaNfProduto: buildQuery(whereClauses.data_pedidoOl_pedidoVenda_produto_nota)


};

module.exports = queries;
