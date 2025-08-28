SELECT 
	'Status' as [Status],
	PedidoEletronico.Cod_PedCli AS [Pedido_OL],
	PedidoVendas.Numero AS [Pedido_Venda],
	PedidoVendas.Cod_NumNfsIni as [Numero_nota],
	'status NF' as [Status_NF],
	'dataEmissão NF' as [emissão_NF],
	PedidoVendasItens.Cod_Produto as [Codigo_Produto],
	Produto.Descricao as  [Produto_descricao],
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
FROM 
	PDECB PedidoEletronico
	INNER JOIN PDEIT PedidoEletronicoItens on PedidoEletronicoItens.Cod_PedCli = PedidoEletronico.Cod_PedCli
	INNER JOIN PDVCB PedidoVendas on PedidoVendas.Numero = PedidoEletronico.Num_PedVen
	INNER JOIN PDVIT PedidoVendasItens on PedidoVendasItens.Cod_Pedido = PedidoVendas.Numero
	INNER JOIN NFSCB NotaSaida on NotaSaida.Num_Nota = PedidoVendas.Cod_NumNfsIni
	INNER JOIN NFSIT NotaSaidaItens on NotaSaidaItens.Num_Nota = NotaSaida.Num_Nota
	INNER JOIN PRODU Produto on Produto.Codigo= PedidoVendasItens.Cod_Produto
WHERE 
	PedidoVendas.Dat_Pedido > '05-08-2025'
GROUP BY
	PedidoEletronico.Cod_PedCli ,
	PedidoVendas.Numero ,
	PedidoVendas.Cod_NumNfsIni ,
	--'status NF' ,
	--'dataEmiss�o NF' ,
	PedidoVendasItens.Cod_Produto ,
	Produto.Descricao ,
	PedidoEletronicoItens.Qtd_Pedido,
	PedidoEletronicoItens.Qtd_Atendi,
	PedidoVendasItens.Qtd_Pedido ,
	--'Qtd_Faturada' ,
	--'quantidade no arquivo Ache' ,
	PedidoVendasItens.Prc_Unitario 




