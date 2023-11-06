const express = require('express');
const { postSong, ctrListSong } = require('../controllers/songController');
const router = express.Router();
const multer = require('multer');
const upload = multer();

router.post('/create-song', upload.fields([{ name: 'avatar_song' }, { name: 'audio' }]), postSong);
router.get('/list-song', ctrListSong);

module.exports = router;
