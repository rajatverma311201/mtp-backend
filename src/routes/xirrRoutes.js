const express = require('express');
const xirrController = require('../controllers/xirrController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(xirrController.getAllInvestements)
  .post(xirrController.addInvestment);

module.exports = router;
