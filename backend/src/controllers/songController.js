const { createSong, getListSong } = require('../services/songService');

const postSong = async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    const avatar_song = req.files.avatar_song[0];
    const audio = req.files.audio[0];
    const { name_song, lyric, song_description, category, singer } = req.body;

    try {
        const result = await createSong(
            authorizationHeader,
            audio,
            avatar_song,
            name_song,
            lyric,
            song_description,
            category,
            singer,
        );
        return res.status(200).json(result);
    } catch (error) {
        const dataReturn = {};
        dataReturn.error = error.message;
        return res.status(500).json(dataReturn);
    }
};

const ctrListSong = async (req, res) => {
    try {
        const result = await getListSong();
        return res.status(200).json(result);
    } catch (error) {
        const dataReturn = {};
        dataReturn.error = error.message;
        return res.status(500).json(dataReturn);
    }
};

module.exports = {
    postSong,
    ctrListSong,
};
