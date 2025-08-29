const fs = require('fs');
const path = require('path');
const csvParse = require('csv-parse');
const xlsx = require('xlsx');

class UploadController {
  async uploadFile(req, res) {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
      }

      const ext = path.extname(file.originalname).toLowerCase();

      let jsonData;

      if (ext === '.csv') {
        const fileContent = fs.readFileSync(file.path);

        csvParse(fileContent, { columns: true, trim: true }, (err, records) => {
          fs.unlinkSync(file.path); // remove o arquivo após o uso

          if (err) {
            return res.status(500).json({ error: 'Erro ao ler CSV' });
          }

          return res.status(200).json({ data: records });
        });
      } else if (ext === '.xlsx') {
        const workbook = xlsx.readFile(file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        jsonData = xlsx.utils.sheet_to_json(sheet);

        fs.unlinkSync(file.path); // remove o arquivo após o uso

        return res.status(200).json({ data: jsonData });
      } else {
        fs.unlinkSync(file.path);
        return res.status(400).json({ error: 'Formato de arquivo não suportado' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro no processamento do arquivo' });
    }
  }
}

// Exporta a instância da classe (padrão usado com Express)
module.exports = new UploadController();
