const express = require('express');
const xirrController = require('../controllers/xirrController');

const router = express.Router();

router.get('/', xirrController.getAllInvestements);

module.exports = router;
