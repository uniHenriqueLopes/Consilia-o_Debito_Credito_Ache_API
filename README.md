
# 📦 API de Conciliação de Pedidos Eletrônicos

Esta é uma API RESTful desenvolvida em **Node.js** para **importar e conciliar arquivos CSV de vendas** com os dados armazenados em um banco de dados **SQL Server**. Seu objetivo é validar se os **pedidos eletrônicos foram pagos pelos fornecedores**.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- mssql (driver para SQL Server)
- Multer (upload de arquivos)
- csv-parser (leitura de arquivos CSV)
- dotenv
- cors
- xlsx
- body-parser

---

## 📁 Estrutura do Projeto


conciliador-pedidos/
├── controllers/
│   └── conciliacaoController.js
├── routes/
│   └── conciliacaoRoutes.js
├── services/
│   └── conciliacaoService.js
├── utils/
│   └── csvParser.js
├── db/
│   └── sqlServer.js
├── uploads/
│   └── (arquivos CSV importados)
├── .env
├── app.js
├── package.json
└── README.md  <-- vamos criar agora

conciliador-pedidos/
│
├── controllers/ # Lógica das rotas
├── routes/ # Definição das rotas da API
├── services/ # Regras de negócio e integração com o banco
├── utils/ # Utilitários (parser CSV etc.)
├── db/ # Conexão com SQL Server
├── uploads/ # Armazenamento temporário dos arquivos CSV
├── .env # Variáveis de ambiente (credenciais)
├── app.js # Arquivo principal da aplicação
└── package.json # Dependências e scripts

## Rotas
- POST /api/conciliacoes/filtrar
{
    "dataInicio": String, Obrigatorio
    "dataFim":String, Obrigatorio
    "pedidoOl":String, Opcional
    "numeroNota":String, Opcional
    "produto":String, Opcional
    "pedidoVenda":String, Opcional
}

- POST /api/conciliacoes/importar

