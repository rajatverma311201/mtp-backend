const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/login',
  authController.validateLoginRequest,
  authController.login
);
router.post(
  '/signup',
  authController.validateSignupRequest,
  authController.signup
);

module.exports = router;
