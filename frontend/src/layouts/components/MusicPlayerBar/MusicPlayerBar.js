import classNames from 'classnames/bind';
import styles from './MusicPlayBar.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { songContext } from '../../../components/SongProvider/SongProvider';

const cx = classNames.bind(styles);

function MusicPlayerBar() {
    const contextSong = useContext(songContext);

    const [audioSrc] = useState(new Audio());

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volumeAudio, setVolumeAudio] = useState(50);
    const [preVolume, setPreVolume] = useState(0.5);
    const [CD, setCD] = useState();

    // Controll Song
    const [isRepeat, setIsRepeat] = useState(false);

    useEffect(() => {
        audioSrc.src = contextSong.audioCurrent || localStorage.getItem('mp3');
        if (contextSong.audioCurrent) {
            const handleDelay = async () => {
                await audioSrc.play();
                contextSong.setIsPlaying(true);
            };
            handleDelay();
        }

        const handleTimeUpdate = () => {
            setCurrentTime(audioSrc.currentTime);
        };

        audioSrc.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            audioSrc.removeEventListener('timeupdate', handleTimeUpdate);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contextSong.audioCurrent]);

    const handleNextSong = () => {
        contextSong.handleNextSong();
    };

    const handleBackSong = () => {
        contextSong.handleBackSong();
    };

    useEffect(() => {
        const handleEndAudio = () => {
            if (!isRepeat) {
                contextSong.setIsPlaying(false);
                audioSrc.pause();
                // Bị lỗi undefined khi lấy listSongHome bên SongProvider
                // handleNextSong();
            } else {
                audioSrc.play();
            }
        };
        audioSrc.addEventListener('ended', handleEndAudio);
        return () => {
            audioSrc.removeEventListener('ended', handleEndAudio);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRepeat]);

    useEffect(() => {
        audioSrc.volume = volumeAudio / 100;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [volumeAudio]);

    useEffect(() => {
        const handlePromiseAudio = async () => {
            await audioSrc.play();
            setDuration(audioSrc.duration);
            audioSrc.pause();
        };
        handlePromiseAudio();

        const cdThumb = document.querySelector(`.${cx('avatar-song')}`);
        const cdThumAnimate = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
            duration: 6000,
            iterations: Infinity,
        });
        cdThumAnimate.pause();
        setCD(cdThumAnimate);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (CD) {
            const playPromise = audioSrc.play();
            if (playPromise !== undefined) {
                const handlePromiseAudio = async () => {
                    await playPromise;
                    if (contextSong.isPlaying) {
                        CD.play();
                        audioSrc.play();
                        contextSong.setIsPlaying(true);
                    } else {
                        CD.pause();
                        audioSrc.pause();
                        contextSong.setIsPlaying(false);
                    }

                    setDuration(audioSrc.duration);
                };
                handlePromiseAudio();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contextSong.isPlaying]);

    const toggle = () => {
        contextSong.setIsPlaying(!contextSong.isPlaying);
    };

    const handleSeek = (e) => {
        const progress = e.target.value;
        audioSrc.currentTime = progress;
        setCurrentTime(progress);
    };

    const handleAdjustVolumn = (e) => {
        const volume = e.target.value;
        audioSrc.volume = volume / 100;
        setVolumeAudio(parseInt(volume));
    };

    const handleMuteSound = () => {
        const volume = audioSrc.volume;
        setPreVolume(volume);
        audioSrc.volume = 0;
        setVolumeAudio(0);
    };

    const handlePreVolume = () => {
        setVolumeAudio(preVolume * 100);
        audioSrc.volume = preVolume;
    };

    const handleRepeat = () => {
        setIsRepeat(!isRepeat);
    };

    const formatTime = (secs) => {
        const durationMinutes = Math.floor(secs / 60);
        const durationSeconds = Math.floor(secs % 60);
        const formattedTime = `${durationMinutes.toString().padStart(2, '0')}:${durationSeconds
            .toString()
            .padStart(2, '0')}`;

        return formattedTime;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('cover-avatar-song')}>
                    <img
                        loading="lazy"
                        className={cx('avatar-song')}
                        src={localStorage.getItem('image')}
                        alt="name_song"
                    />
                </div>
                <div className={cx('right-player-bar')}>
                    <div className={cx('cover-des-song')}>
                        <div className={cx('des-song')}>
                            <span className={cx('name-song')}>{localStorage.getItem('namesong')}</span>
                            <span className={cx('singer-song')}>{localStorage.getItem('singer')}</span>
                            <div className={cx('love-song')}>
                                <i className="fa-regular fa-heart"></i>
                                <i className="fa-solid fa-ellipsis"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('center-player-bar')}>
                    <div className={cx('control-song-icon')}>
                        <i className={cx('fa-solid fa-shuffle', 'control-icon')}></i>
                        <i className={cx('fa-solid fa-backward-step', 'control-icon')} onClick={handleBackSong}></i>
                        <div
                            className={cx('cover-icon-play')}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === ' ') {
                                    toggle();
                                }
                            }}
                            onClick={toggle}
                        >
                            {contextSong.isPlaying ? (
                                <i className={cx('fa-solid fa-pause', 'icon-pause')}></i>
                            ) : (
                                <i className={cx('fa-solid fa-play', 'icon-play')}></i>
                            )}
                        </div>
                        <i className={cx('fa-solid fa-forward-step', 'control-icon')} onClick={handleNextSong}></i>
                        <i
                            className={cx('fa-solid fa-repeat', 'control-icon', { repeat: isRepeat })}
                            onClick={handleRepeat}
                        ></i>
                    </div>
                    <div className={cx('timer-song')}>
                        <span style={{ opacity: '0.6' }} className={cx('count-time-song', 'mr-8')}>
                            {formatTime(currentTime)}
                        </span>
                        <div className={cx('bar-count-time')}>
                            <input
                                className={cx('form-control-time')}
                                type="range"
                                min={0}
                                max={duration}
                                value={currentTime}
                                onChange={handleSeek}
                            ></input>
                        </div>

                        <span className={cx('count-time-song', 'ml-8')}>{formatTime(duration)}</span>
                    </div>
                </div>
                <div className={cx('left-player-bar')}>
                    <i className={cx('fa-solid fa-music', 'mr-24')}></i>
                    {volumeAudio === 0 ? (
                        <i
                            className="fa-solid fa-volume-xmark"
                            style={{ marginRight: '10px' }}
                            onClick={handlePreVolume}
                        ></i>
                    ) : (
                        <i className={cx('fa-solid fa-volume-high', 'mr-8')} onClick={handleMuteSound}></i>
                    )}

                    <div className={cx('bar-count-volume')}>
                        <input
                            className={cx('form-control-volume')}
                            type="range"
                            min={0}
                            value={volumeAudio}
                            onChange={handleAdjustVolumn}
                        ></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayerBar;
