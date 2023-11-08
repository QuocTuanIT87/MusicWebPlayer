const express = require('express');
const { postRegisterAccount, postLoginAccount, ctrUserCurrent } = require('../controllers/userController');
const router = express.Router();

router.post('/register', postRegisterAccount);
router.post('/login', postLoginAccount);
router.get('/user-current', ctrUserCurrent);

module.exports = router;
