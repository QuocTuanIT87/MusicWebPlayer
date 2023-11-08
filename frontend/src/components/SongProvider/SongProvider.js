import { createContext, useEffect, useState } from 'react';
import { GetListSongService } from '../../service/Song/GetListSongService';

export const songContext = createContext();

function SongProvider({ children }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioCurrent, setAudioCurrent] = useState();
    const [listSongHome, setListSongHome] = useState();
    const [currentId, setCurrentId] = useState(parseInt(localStorage.getItem('index')));

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await GetListSongService();
            setListSongHome(result.data?.listSong);
        };
        fetchAPI();
    }, []);

    const handleNextSong = () => {
        if (currentId + 1 < listSongHome.length) {
            const item = listSongHome[currentId + 1];
            localStorage.setItem('image', item.avatar_song);
            localStorage.setItem('singer', item.singer);
            localStorage.setItem('namesong', item.name_song);
            localStorage.setItem('mp3', item.audio);
            setAudioCurrent(item.audio);
            setCurrentId(currentId + 1);
            localStorage.setItem('index', currentId + 1);
        }
    };

    const handleBackSong = () => {
        if (currentId - 1 >= 0) {
            const item = listSongHome[currentId - 1];
            localStorage.setItem('image', item.avatar_song);
            localStorage.setItem('singer', item.singer);
            localStorage.setItem('namesong', item.name_song);
            localStorage.setItem('mp3', item.audio);
            setAudioCurrent(item.audio);
            setCurrentId(currentId - 1);
            localStorage.setItem('index', currentId - 1);
        }
    };

    const value = {
        isPlaying,
        listSongHome,
        setIsPlaying,
        audioCurrent,
        setAudioCurrent,
        currentId,
        setCurrentId,
        handleNextSong,
        handleBackSong,
    };

    return <songContext.Provider value={value}>{children}</songContext.Provider>;
}

export default SongProvider;
