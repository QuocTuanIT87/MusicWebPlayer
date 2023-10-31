const express = require('express');
const {
    getHomepage,
    getImageRose,
    createUser,
    getCreateUserPage,
    getUpdateUserPage,
    postUpdateUser,
    postDeleteUser,
} = require('../controllers/homeController');
const router = express.Router();

router.get('/', getHomepage);
router.get('/get-rose', getImageRose);
router.post('/create-user', createUser);
router.get('/create-user-page', getCreateUserPage);
router.get('/update-user-page/:userid', getUpdateUserPage);
router.post('/update-user', postUpdateUser);
router.post('/delete-user/:userid', postDeleteUser);

module.exports = router;
