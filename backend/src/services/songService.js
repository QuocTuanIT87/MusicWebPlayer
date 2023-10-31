const { handleCheckToken } = require('../controllers/authController');
const { message } = require('../messages/message');
const db = require('../models/index');
const { uploadFileMp3, authorize, uploadFileImage, createFolder } = require('./UploadFileMp3Service');

const isImageFile = (file) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']; // Các phần mở rộng file ảnh cho phép
    const fileExtension = file.split('.').pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
};

const checkFiledCreateSong = (audio, avatar_song, songName, category) => {
    const dataReturn = {};
    dataReturn.isGoodFields = false;

    if (!audio) {
        dataReturn.message = message.audioEmpty;
    } else if (!avatar_song) {
        dataReturn.message = message.avatarSongEmpty;
    } else if (!isImageFile(avatar_song.originalname)) {
        dataReturn.message = message.notValidImage;
    } else if (!songName) {
        dataReturn.message = message.songNameEmpty;
    } else if (!category) {
        dataReturn.message = message.categoryEmpty;
    } else if (!audio.originalname.endsWith('.mp3')) {
        dataReturn.message = message.notValidMp3;
    } else {
        dataReturn.isGoodFields = true;
    }
    return dataReturn;
};

const createSong = async (authorizationHeader, audio, avatar_song, songName, lyric, song_description, category) => {
    const dataReturn = {};
    const token = authorizationHeader.split(' ')[1];
    const user = await handleCheckToken(token);
    const checkFile = checkFiledCreateSong(audio, avatar_song, songName, category);
    return new Promise(async (resolve, reject) => {
        try {
            if (checkFile.isGoodFields) {
                if (user.isValidToken) {
                    const idUser = user.userId;

                    // Tạo folder mới trên gg drive và upload file mp3 và ảnh của bài hát vào folder đó
                    const authClient = await authorize();
                    const idFolder = await createFolder(authClient, songName);
                    const fileSong = await uploadFileMp3(authClient, audio, songName, idFolder);
                    const fileImage = await uploadFileImage(authClient, avatar_song, songName, idFolder);

                    // Tạo bài hát mới trên database
                    const song = await db.Song.create({
                        name_song: songName,
                        lyric: lyric,
                        audio: `https://drive.google.com/file/d/${fileSong.data.id}/view`,
                        song_description: song_description,
                        avatar_song: `https://drive.google.com/file/d/${fileImage.data.id}/view`,
                        category: category,
                        userId: idUser,
                    });
                    if (song) {
                        console.log('SONG: ', song);
                        dataReturn.errCode = 0;
                        dataReturn.message = message.postSuccessSong;
                        dataReturn.song = song;
                    } else {
                        dataReturn.errCode = 0;
                        dataReturn.message = message.errorPostSong;
                    }
                } else {
                    dataReturn.errCode = 1;
                    dataReturn.message = user.message;
                }
            } else {
                dataReturn.errCode = 1;
                dataReturn.message = checkFile.message;
            }
            resolve(dataReturn);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createSong,
};
