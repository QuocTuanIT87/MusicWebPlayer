const { handleCheckToken } = require('../controllers/authController');
const { message } = require('../messages/message');
const db = require('../models/index');
const { uploadFileMp3, uploadFileImage } = require('./UploadFileMp3Service');

const isImageFile = (file) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']; // Các phần mở rộng file ảnh cho phép
    const fileExtension = file.split('.').pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
};

const checkFiledCreateSong = (files, songName, category, singer) => {
    const dataReturn = {};

    dataReturn.isGoodFields = false;
    if (!files.audio && !files.avatar_song) {
        dataReturn.message = message.filesEmpty;
    } else if (!files.audio) {
        dataReturn.message = message.audioEmpty;
    } else if (!singer) {
        dataReturn.message = message.singerEmpty;
    } else if (!files.avatar_song) {
        dataReturn.message = message.avatarSongEmpty;
    } else if (!isImageFile(files.avatar_song[0].originalname)) {
        dataReturn.message = message.notValidImage;
    } else if (!songName) {
        dataReturn.message = message.songNameEmpty;
    } else if (!category) {
        dataReturn.message = message.categoryEmpty;
    } else if (!files.audio[0].originalname.endsWith('.mp3')) {
        dataReturn.message = message.notValidMp3;
    } else {
        dataReturn.isGoodFields = true;
    }
    return dataReturn;
};

const createSong = async (authorizationHeader, files, songName, lyric, song_description, category, singer) => {
    const dataReturn = {};
    const token = authorizationHeader.split(' ')[1];
    const user = await handleCheckToken(token);

    const checkFile = checkFiledCreateSong(files, songName, category, singer);

    return new Promise(async (resolve, reject) => {
        try {
            if (checkFile.isGoodFields) {
                if (user.isValidToken) {
                    const idUser = user.userId;

                    // Tạo folder mới trên gg drive và upload file mp3 và ảnh của bài hát vào folder đó
                    const fileSong = await uploadFileMp3(files?.audio[0], songName);
                    const fileImage = await uploadFileImage(files?.avatar_song[0], songName);
                    // Tạo bài hát mới trên database
                    const song = await db.Song.create({
                        name_song: songName,
                        lyric: lyric,
                        audio: fileSong,
                        song_description: song_description,
                        avatar_song: fileImage,
                        category: category,
                        userId: idUser,
                        singer: singer,
                    });
                    if (song) {
                        dataReturn.errCode = 0;
                        dataReturn.message = message.postSuccessSong;
                        dataReturn.song = song;
                    } else {
                        dataReturn.errCode = 1;
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

const getListSong = () => {
    const dataReturn = {};

    return new Promise(async (resolve, reject) => {
        try {
            const listSong = await db.Song.findAll({
                include: {
                    model: db.User,
                    as: 'user',
                },
            });
            dataReturn.listSong = listSong;
            resolve(dataReturn);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createSong,
    getListSong,
};
