const { createSong, getListSong } = require('../services/songService');

const postSong = async (req, res) => {
    const authorizationHeader = req.headers['authorization'];

    const files = req.files;
    const { name_song, lyric, song_description, category, singer } = req.body;

    try {
        const result = await createSong(
            authorizationHeader,
            files,
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
