
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


## Rotas
- POST /api/conciliacoes/filtrar
- {
/n    "dataInicio": String, Obrigatorio
/n   "dataFim":String, Obrigatorio
/n   "pedidoOl":String, Opcional
-    "numeroNota":String, Opcional
-    "produto":String, Opcional
-    "pedidoVenda":String, Opcional
- }

- POST /api/conciliacoes/importar

