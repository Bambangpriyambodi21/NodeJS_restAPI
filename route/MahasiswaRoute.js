const express = require('express');
const mahasiswaController = require('../controller/MahasiswaController');

const router = express.Router();

router.get('/', mahasiswaController.getAllMahasiswa);
router.post('/', mahasiswaController.createMahasiswa);
router.put('/:nim', mahasiswaController.updateMahasiswa);
router.delete('/:nim', mahasiswaController.deleteMahasiswa);

module.exports = router;