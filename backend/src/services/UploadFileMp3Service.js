const fs = require('fs');
const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const apikeys = require('../../apikey.json');
const stream = require('stream');

const SCOPE = ['https://www.googleapis.com/auth/drive'];

async function authorize() {
    const jwtClient = new google.auth.JWT(apikeys.client_email, null, apikeys.private_key, SCOPE);

    await jwtClient.authorize();

    return jwtClient;
}

async function uploadFileMp3(authClient, fileMp3, songName, idFolder) {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileMp3.buffer);
    return new Promise((resolve, reject) => {
        const drive = google.drive({ version: 'v3', auth: authClient });

        const fileMetaData = {
            name: songName,
            parents: [idFolder],
        };

        drive.files.create(
            {
                resource: fileMetaData,
                media: {
                    body: bufferStream,
                    mimeType: 'audio/mp3', // Hoặc 'audio/mp3'
                },
                fields: 'id',
            },
            function (err, file) {
                if (err) {
                    return reject(err);
                }
                resolve(file);
            },
        );
    });
}

async function uploadFileImage(authClient, avatarSong, songName, idFolder) {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(avatarSong.buffer);
    return new Promise((resolve, reject) => {
        const drive = google.drive({ version: 'v3', auth: authClient });

        const fileMetaData = {
            name: songName + ' ' + 'avatar-song',
            parents: [idFolder],
        };

        drive.files.create(
            {
                resource: fileMetaData,
                media: {
                    body: bufferStream,
                    mimeType: 'image/jpg',
                },
                fields: 'id',
            },
            function (err, file) {
                if (err) {
                    return reject(err);
                }
                resolve(file);
            },
        );
    });
}

async function createFolder(authClient, songName) {
    // Get credentials and build service
    // TODO (developer) - Use appropriate auth mechanism for your app
    return new Promise((resolve, reject) => {
        const drive = google.drive({ version: 'v3', auth: authClient });
        const fileMetadata = {
            name: songName,
            mimeType: 'application/vnd.google-apps.folder',
            parents: ['1TG3o4Iw97bcWN-7QoqQPe0AgXvK3RrXr'],
        };
        const file = drive.files.create(
            {
                resource: fileMetadata,
                fields: 'id',
            },
            function (err, file) {
                if (err) {
                    return reject(err);
                }
                resolve(file.data.id);
            },
        );
    });
}

module.exports = {
    uploadFileMp3,
    authorize,
    uploadFileImage,
    createFolder,
};
