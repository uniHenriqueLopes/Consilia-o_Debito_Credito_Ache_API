// querys/inserirDadosConcilicao.js

function buildDebitoInsertQuery() {
    return `
    INSERT INTO UHCDB.dbo.DebitosAche (
      idDataIngestion,
      Cod_EAN,
      Apresentacao,
      CNPJ_Distribuidor,
      Numero_NF,
      Qtde_Faturamento,
      Valor_Bruto,
      prct_Desconto,
      prct_Desconto_Padrao,
      prct_Custo_Margem,
      prct_Debito,
      Valor_Debito_Bruto,
      prct_Repasse_ICMS,
      Valor_Repasse_ICMS,
      Valor_Debito_Final,
      RF_Ajuste_Tributario,
      RF_Valor_Debito,
      RF_Aliquota_Interestadual,
      RF_PISCofins,
      RF_RedutorICMS
    )
    VALUES (
      @idDataIngestion,
      @Cod_EAN,
      @Apresentacao,
      @CNPJ_Distribuidor,
      @Numero_NF,
      @Qtde_Faturamento,
      @Valor_Bruto,
      @prct_Desconto,
      @prct_Desconto_Padrao,
      @prct_Custo_Margem,
      @prct_Debito,
      @Valor_Debito_Bruto,
      @prct_Repasse_ICMS,
      @Valor_Repasse_ICMS,
      @Valor_Debito_Final,
      @RF_Ajuste_Tributario,
      @RF_Valor_Debito,
      @RF_Aliquota_Interestadual,
      @RF_PISCofins,
      @RF_RedutorICMS
    );
  `;
}

function buildInsertArquivoQuery() {
  return `
    INSERT INTO UHCDB.dbo.DataIngestion (
      name,
      idUser,
      date
    )
    OUTPUT INSERTED.id
    VALUES (
      @nomeArquivo,
      10,
      @dataImportacao
    );
  `;
}

function buildDebitoSelectNameQuery() {
  return `
    SELECT * FROM UHCDB.dbo.DataIngestion where name = @nomeArquivo
  `

}
module.exports = { buildDebitoInsertQuery,buildInsertArquivoQuery,buildDebitoSelectNameQuery };
