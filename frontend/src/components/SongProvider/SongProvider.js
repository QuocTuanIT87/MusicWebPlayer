import { createContext, useState } from 'react';

export const songContext = createContext();

function SongProvider({ children }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioCurrent, setAudioCurrent] = useState();

    const value = {
        isPlaying,
        setIsPlaying,
        audioCurrent,
        setAudioCurrent,
    };

    return <songContext.Provider value={value}>{children}</songContext.Provider>;
}

export default SongProvider;
