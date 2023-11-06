const fs = require('fs');
const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const apikeys = require('../../apikey.json');
const stream = require('stream');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const firebase = require('firebase/app');
const { firebaseConfig } = require('../config/firebase.config');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = getStorage();

function generateRandomId() {
    const timestamp = new Date().getTime(); // Sử dụng timestamp
    const randomNum = Math.floor(Math.random() * 1000); // Số ngẫu nhiên từ 0 đến 999
    return `${timestamp}-${randomNum}`;
}

async function uploadFileMp3(fileMp3, songName) {
    const fileName = songName + ' filemp3 ' + generateRandomId();
    const storageRef = ref(storage, fileName);
    const metadata = {
        contentType: fileMp3.mimetype,
    };
    return new Promise(async (resolve, reject) => {
        try {
            await uploadBytes(storageRef, fileMp3.buffer, metadata);
            const result = await getDownloadURL(ref(storage, fileName));
            resolve(result);
        } catch (error) {
            reject(err);
        }
    });
}

async function uploadFileImage(avatarSong, songName) {
    const fileName = songName + ' avatar-song ' + generateRandomId();
    const storageRef = ref(storage, fileName);
    const metadata = {
        contentType: avatarSong.mimetype,
    };
    return new Promise(async (resolve, reject) => {
        try {
            await uploadBytes(storageRef, avatarSong.buffer, metadata);
            const result = await getDownloadURL(ref(storage, fileName));
            resolve(result);
        } catch (error) {
            reject(err);
        }
    });
}

module.exports = {
    uploadFileMp3,
    uploadFileImage,
};
