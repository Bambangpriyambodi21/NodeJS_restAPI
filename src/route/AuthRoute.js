const authController = require('../controller/AuthController');
const express = require('express')
const router = express.Router()

router.post('/login', authController.loginController);

module.exports = router;