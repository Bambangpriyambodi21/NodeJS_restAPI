const express = require('express')
const dosenController = require('../controller/DosenController')
const route = express.Router()

route.get('/', dosenController.getAllDosen);
route.post('/', dosenController.createDosen);
route.put('/:id', dosenController.updateDosen);
route.delete('/:id', dosenController.deleteDosen);

module.exports = route