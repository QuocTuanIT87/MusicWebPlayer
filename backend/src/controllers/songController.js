const { createSong } = require('../services/songService');

const postSong = async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    const avatar_song = req.files.avatar_song[0];
    const audio = req.files.audio[0];
    const { name_song, lyric, song_description, category } = req.body;

    try {
        const result = await createSong(
            authorizationHeader,
            audio,
            avatar_song,
            name_song,
            lyric,
            song_description,
            category,
        );
        return res.status(200).json(result);
    } catch (error) {}
};

module.exports = {
    postSong,
};
