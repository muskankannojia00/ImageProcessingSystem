const express = require('express');
const multer = require('../middlewares/multerConfig');
const { uploadCSV, getStatus } = require('../controllers/imageController');

const router = express.Router();

// Route for uploading CSV files
router.post('/upload', multer.single('file'), uploadCSV);

// Route for checking the status of a request by ID
router.get('/status/:id', getStatus);

module.exports = router;
