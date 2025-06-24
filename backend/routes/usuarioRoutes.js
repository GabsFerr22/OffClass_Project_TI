const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuariosController');

router.post('/registrar', controller.registrar);
router.post('/login', controller.login);

module.exports = router;
