-- Definindo as variáveis para o intervalo de datas, tornando o código mais flexível
DECLARE @DataInicio DATE = '2025-06-01'; -- Data de início para o filtro
DECLARE @DataFim DATE = '2025-06-30'; -- Data de fim para o filtro

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
        AND NotaSaida.Dat_Emissao BETWEEN @DataInicio AND @DataFim
),
-- CTE para as Vendas de Pernambuco (Uni Hospitalar)
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
        AND NotaSaida.Dat_Emissao BETWEEN @DataInicio AND @DataFim
)
-- Consulta principal que une as vendas de ambos os estados
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
    CASE 
        WHEN Vendas.Status = 'F' THEN 'FECHADA'
        WHEN Vendas.Status = 'C' THEN 'CANCELADA'
        WHEN Vendas.Status = 'A' THEN 'ABERTA'
    END AS [Status_NF],
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
RIGHT JOIN (
    SELECT * FROM VendasUniCE
    UNION ALL
    SELECT * FROM VendasUniPE
) AS Vendas 
    ON Vendas.Num_Nota = DebitosAche.Numero_NF 
    AND Vendas.Cod_EAN COLLATE Latin1_General_CI_AS = DebitosAche.Cod_EAN COLLATE Latin1_General_CI_AS
GROUP BY
    Vendas.Num_Nota,
    Vendas.Empresa,
    Vendas.Status,
    Vendas.Pedido_OL,
    Vendas.Pedido_Venda,
    Vendas.Dat_Emissao,
    Vendas.codigo_Produto,
    Vendas.Nome_Produto,
    Vendas.Cod_EAN,
    Vendas.Fabricante,
    Vendas.Qtd_Produto,
    DebitosAche.Qtde_Faturamento,
    Vendas.Prc_Unitario,
    Vendas.Vlr_BruItem,
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
    DebitosAche.Numero_NF;
