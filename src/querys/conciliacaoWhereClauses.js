const whereClauses = {

  data_nota: `    
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `,

  data_pedidoOl: `
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND NotaSaida.Cod_PedCliPde LIKE @pedidoOl
  `,

  data_pedidoVenda: `
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND PedidoVendas.Numero LIKE @pedidoVenda
  `,

  data_produto: `
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND Produto.Descricao LIKE @produto
  `,



  data_nota_produto: `
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND NotaSaida.Num_Nota LIKE @numeroNota
    AND Produto.Descricao LIKE @produto
    
  `,



  data_pedidoOl_produto: `
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND Produto.Descricao LIKE @produto
  `,


  data_pedidoVenda_produto: `
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND PedidoVendas.Numero LIKE @pedidoVenda
    AND Produto.Descricao LIKE @produto
  `,

  data_pedidoOl_pedidoVenda: `
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND PedidoVendas.Numero LIKE @pedidoVenda
  `,

  data_pedidoOl_nota: `
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `,

  data_pedidoVenda_nota: `
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND PedidoVendas.Numero LIKE @pedidoVenda
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `,

  pedidoOl_pedidoVenda_produto: `
      NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND PedidoVendas.Numero LIKE @pedidoVenda
    AND Produto.Descricao LIKE @produto
  `,

  pedidoOl_produto_nota: `
      NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND Produto.Descricao LIKE @produto
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `,

  pedidoVenda_produto_nota: `
      NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    PedidoVendas.Numero LIKE @pedidoVenda
    AND Produto.Descricao LIKE @produto
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `,

  data_pedidoOl_produto_nota: `
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND Produto.Descricao LIKE @produto
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `,

  data_pedidoVenda_produto_nota: `
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND PedidoVendas.Numero LIKE @pedidoVenda
    AND Produto.Descricao LIKE @produto
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `,

  data_pedidoOl_pedidoVenda_produto: `
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND PedidoVendas.Numero LIKE @pedidoVenda
    AND Produto.Descricao LIKE @produto
  `,

  data_pedidoOl_pedidoVenda_nota: `
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND PedidoVendas.Numero LIKE @pedidoVenda
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `,

  data_pedidoOl_pedidoVenda_produto_nota: `
    NotaSaida.Dat_Emissao BETWEEN @dataInicio AND @dataFim
    AND PedidoEletronico.Cod_PedCli LIKE @pedidoOl
    AND PedidoVendas.Numero LIKE @pedidoVenda
    AND Produto.Descricao LIKE @produto
    AND NotaSaida.Num_Nota LIKE @numeroNota
  `
};

module.exports = whereClauses;
