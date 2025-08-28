const whereClauses = {
  data_nota_produto: `
    PedidoVendas.Dat_Pedido BETWEEN @dataInicio AND @dataFim
    AND NotaSaida.Num_Nota LIKE @numeroNota
    AND Produto.Descricao LIKE @produto
  `,

  data_pedidoOl_produto: `
    PedidoVendas.Dat_Pedido BETWEEN @dataInicio AND @dataFim
    AND PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND Produto.Descricao LIKE @produto
  `,

  data_pedidoVenda_produto: `
    PedidoVendas.Dat_Pedido BETWEEN @dataInicio AND @dataFim
    AND PedidoVendas.Numero LIKE @pedidoVenda
    AND Produto.Descricao LIKE @produto
  `,

  data_pedidoOl_pedidoVenda: `
    PedidoVendas.Dat_Pedido BETWEEN @dataInicio AND @dataFim
    AND PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND PedidoVendas.Numero LIKE @pedidoVenda
  `,

  data_pedidoOl_nota: `
    PedidoVendas.Dat_Pedido BETWEEN @dataInicio AND @dataFim
    AND PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `,

  data_pedidoVenda_nota: `
    PedidoVendas.Dat_Pedido BETWEEN @dataInicio AND @dataFim
    AND PedidoVendas.Numero LIKE @pedidoVenda
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `,

  pedidoOl_pedidoVenda_produto: `
    PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND PedidoVendas.Numero LIKE @pedidoVenda
    AND Produto.Descricao LIKE @produto
  `,

  pedidoOl_produto_nota: `
    PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND Produto.Descricao LIKE @produto
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `,

  pedidoVenda_produto_nota: `
    PedidoVendas.Numero LIKE @pedidoVenda
    AND Produto.Descricao LIKE @produto
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `,

  data_pedidoOl_produto_nota: `
    PedidoVendas.Dat_Pedido BETWEEN @dataInicio AND @dataFim
    AND PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND Produto.Descricao LIKE @produto
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `,

  data_pedidoVenda_produto_nota: `
    PedidoVendas.Dat_Pedido BETWEEN @dataInicio AND @dataFim
    AND PedidoVendas.Numero LIKE @pedidoVenda
    AND Produto.Descricao LIKE @produto
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `,

  data_pedidoOl_pedidoVenda_produto: `
    PedidoVendas.Dat_Pedido BETWEEN @dataInicio AND @dataFim
    AND PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND PedidoVendas.Numero LIKE @pedidoVenda
    AND Produto.Descricao LIKE @produto
  `,

  data_pedidoOl_pedidoVenda_nota: `
    PedidoVendas.Dat_Pedido BETWEEN @dataInicio AND @dataFim
    AND PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND PedidoVendas.Numero LIKE @pedidoVenda
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `,

  data_pedidoOl_pedidoVenda_produto_nota: `
    PedidoVendas.Dat_Pedido BETWEEN @dataInicio AND @dataFim
    AND PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND PedidoVendas.Numero LIKE @pedidoVenda
    AND Produto.Descricao LIKE @produto
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `
};

module.exports = whereClauses;
