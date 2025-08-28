const whereClauses = require('./conciliacaoWhereClauses');

// arquivo: /querys/conciliacaoQuerys.js
const selectColumns = `
CASE 
	WHEN DebitosAche.Numero_NF IS NULL THEN 'NÃO CONCILIADO'
	WHEN NotaSaida.Num_Nota IS NULL THEN 'NÃO FATURADA'
	WHEN NotaSaida.Status = 'C' THEN 'NF CANCELADA'
	ELSE 'CONCILIADO'
END AS [Status],

PedidoEletronico.Cod_PedCli AS [Pedido_OL],
PedidoVendas.Numero AS [Pedido_Venda],
PedidoVendas.Cod_NumNfsIni as [Numero_nota],
NotaSaida.Status as [Status_NF],
NotaSaida.Dat_Emissao as [emissão_NF],
PedidoVendasItens.Cod_Produto as [Codigo_Produto],
Produto.Descricao as  [Produto_descricao],
--PedidoEletronicoItens.Qtd_Pedido as [quantidade_OL],
--PedidoEletronicoItens.Qtd_Atendi as [Qtd_Atendida_OL],
--NotaSaidaItens.Qtd_Produto as [Qtd_Pedido_Venda], --TENTAR PUXAR DADOS DA NFSIT
ISNULL(DebitosAche.Qtde_Faturamento, 0) as [Qtd_Faturada],
'nome do Arquivo' as [Qtd_Ache],
PedidoVendasItens.Prc_Unitario as [Valor_Unitario_Venda],
ISNULL(DebitosAche.RF_Valor_Debito, 0) AS [RFValorDebito],
ISNULL(DebitosAche.RF_Ajuste_Tributario, 0) AS [RFAjusteTributario],
ISNULL(DebitosAche.prct_Desconto, 0) AS [Desconto],
ISNULL(DebitosAche.prct_Desconto_Padrao, 0) AS [Desconto_padrao],
PedidoEletronico.Dat_LeiPed AS [DataEntradaArquivo],
'Empresa' AS [Empresa]

`;

const joinTables = `
	DMD.dbo.PDECB PedidoEletronico
	INNER JOIN DMD.dbo.PDEIT PedidoEletronicoItens 
		ON PedidoEletronicoItens.Cod_PedCli = PedidoEletronico.Cod_PedCli
	INNER JOIN DMD.dbo.PDVCB PedidoVendas 
		ON PedidoVendas.Numero = PedidoEletronico.Num_PedVen
	INNER JOIN DMD.dbo.PDVIT PedidoVendasItens 
		ON PedidoVendasItens.Cod_Pedido = PedidoVendas.Numero
	INNER JOIN DMD.dbo.NFSCB NotaSaida 
		ON NotaSaida.Num_Nota = PedidoVendas.Cod_NumNfsIni
	INNER JOIN DMD.dbo.NFSIT NotaSaidaItens 
		ON NotaSaidaItens.Num_Nota = NotaSaida.Num_Nota
	INNER JOIN DMD.dbo.PRODU Produto 
		ON Produto.Codigo = PedidoVendasItens.Cod_Produto
	LEFT JOIN [UHCDB].[dbo].[DebitosAche] 
		ON DebitosAche.Numero_NF = NotaSaida.Num_Nota
`;

const groupByFields = `
	PedidoEletronico.Cod_PedCli,
	PedidoVendas.Numero,
	PedidoVendas.Cod_NumNfsIni,
	PedidoVendasItens.Cod_Produto,
	NotaSaida.Status,
	NotaSaida.Dat_Emissao,
	Produto.Descricao,
	--PedidoEletronicoItens.Qtd_Pedido,
	--PedidoEletronicoItens.Qtd_Atendi,
	--NotaSaidaItens.Qtd_Produto,
	PedidoVendasItens.Qtd_Pedido,
	PedidoVendasItens.Prc_Unitario,
	PedidoEletronico.Dat_LeiPed,
	DebitosAche.Numero_NF,
	DebitosAche.Qtde_Faturamento,
	DebitosAche.RF_Valor_Debito,
	DebitosAche.RF_Ajuste_Tributario,
	DebitosAche.prct_Desconto,
	DebitosAche.prct_Desconto_Padrao,
	NotaSaida.Num_Nota
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
