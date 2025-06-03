const express = require('express');
const router = express.Router();
const { handleForm } = require('../controller/formController');

router.post('/form', handleForm);

module.exports = router;
