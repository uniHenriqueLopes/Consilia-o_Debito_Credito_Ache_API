const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/fileUploadController');

// Configurar Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadController.uploadFile);

module.exports = router;
