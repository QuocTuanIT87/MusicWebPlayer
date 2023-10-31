const express = require('express');
const { postRegisterAccount, postLoginAccount } = require('../controllers/userController');
const router = express.Router();

router.post('/register', postRegisterAccount);
router.post('/login', postLoginAccount);

module.exports = router;
