const express = require('express');
const router = express.Router();
const { getLoginPage, loginUser, logoutUser } = require('../controllers/authController');

router.get('/login', getLoginPage);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

module.exports = router;
