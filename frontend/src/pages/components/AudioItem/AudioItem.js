import styles from './AudioItem.module.scss';
import classNames from 'classnames/bind';
import playIngIcon from '../../../assets/images/icon-playing.gif';
import { useContext } from 'react';
import { songContext } from '../../../components/SongProvider/SongProvider';

const cx = classNames.bind(styles);

function AudioItem({ song, index }) {
    const contextSong = useContext(songContext);

    function formatTimeDifference(inputDate) {
        const currentDate = new Date();
        const dateCreate = new Date(inputDate);

        const dateDifference = (currentDate - dateCreate) / 1000;
        if (dateDifference < 60) {
            return `${Math.floor(dateDifference)} giây trước`;
        } else if (dateDifference < 3600) {
            return `${Math.floor(dateDifference / 60)} phút trước`;
        } else if (dateDifference < 86400) {
            return `${Math.floor(dateDifference / 3600)} giờ trước`;
        } else if (dateDifference < 2678400) {
            return `${Math.floor(dateDifference / 86400)} ngày trước`;
        } else if (dateDifference < 31536000) {
            return `${Math.floor(dateDifference / 2678400)} tháng trước`;
        } else {
            return `${Math.floor(dateDifference / 31536000)} năm trước`;
        }
    }

    const handlePlayAudio = (audio, avatarSong, nameSong, singer, index) => {
        localStorage.setItem('mp3', audio);
        localStorage.setItem('image', avatarSong);
        localStorage.setItem('singer', singer);
        localStorage.setItem('namesong', nameSong);
        localStorage.setItem('index', index);
        contextSong.setIsPlaying(true);
        contextSong.setAudioCurrent(audio);
        contextSong.setCurrentId(index);
    };
    return (
        <div className={cx('info-a-song')}>
            <div
                className={cx('cover-img')}
                onClick={() => handlePlayAudio(song.audio, song.avatar_song, song.name_song, song.singer, index)}
            >
                <img src={song.avatar_song} alt="avatar_song" />
                {localStorage.getItem('mp3') === song.audio && contextSong.isPlaying ? (
                    <img loading="lazy" src={playIngIcon} alt="playing_icon" className={cx('playing-icon')} />
                ) : (
                    <i className={cx('fa-solid fa-play', 'play-icon')}></i>
                )}
            </div>
            <div className={cx('des-song')}>
                <span className={cx('song-name')}>{song.name_song}</span>
                <span className={cx('singer-name')}>{song.singer}</span>
                <span className={cx('time-upload')}>{formatTimeDifference(song.createdAt)}</span>
            </div>
            <i className={cx('fa-solid fa-ellipsis', 'option-icon')}></i>
        </div>
    );
}

export default AudioItem;
