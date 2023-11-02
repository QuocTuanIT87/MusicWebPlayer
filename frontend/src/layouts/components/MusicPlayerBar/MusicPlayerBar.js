import classNames from 'classnames/bind';
import styles from './MusicPlayBar.module.scss';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function MusicPlayerBar() {
    const linkFileMp3 = 'http://docs.google.com/uc?export=open&id=1TF8Oz-bG8UBbz4rOtI_uYQxiFary8cJD';
    const [audioSrc, setAudioSrc] = useState(linkFileMp3);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volumeAudio, setVolumeAudio] = useState(50);
    const [preVolume, setPreVolume] = useState(0.5);

    const audioRef = useRef();
    console.log('isRepeat!');

    const toggle = () => {
        setPlaying(!playing);
        setAudioSrc(linkFileMp3);
    };

    useEffect(() => {
        playing ? audioRef.current.play() : audioRef.current.pause();
    }, [audioRef, playing]);

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e) => {
        audioRef.current.currentTime = e.target.value;
        setCurrentTime(e.target.value);
    };

    const handleAdjustVolumn = (e) => {
        audioRef.current.volume = e.target.value / 100;
        setVolumeAudio(parseInt(e.target.value));
    };

    const handleMuteSound = () => {
        setPreVolume(audioRef.current.volume);
        audioRef.current.volume = 0;
        setVolumeAudio(0);
    };

    const handlePreVolume = () => {
        setVolumeAudio(preVolume * 100);
        audioRef.current.volume = preVolume;
    };

    useEffect(() => {
        const myAudio = audioRef.current;
        myAudio.volume = volumeAudio / 100;
        myAudio.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            myAudio.removeEventListener('timeupdate', handleTimeUpdate);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formatTime = (secs) => {
        const durationMinutes = Math.floor(secs / 60);
        const durationSeconds = Math.floor(secs % 60);
        const formattedTime = `${durationMinutes.toString().padStart(2, '0')}:${durationSeconds
            .toString()
            .padStart(2, '0')}`;
        return formattedTime;
    };

    useEffect(() => {
        const currentRef = audioRef.current;
        currentRef.addEventListener('ended', () => setPlaying(false));
        return () => {
            currentRef.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audioRef]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('right-player-bar')}>
                    <div className={cx('cover-des-song')}>
                        <img
                            className={cx('avatar-song', { spin: playing })}
                            src="http://docs.google.com/uc?export=open&id=1xNFLuof5sWqELIg5yDehioI7CjHSAWJS"
                            alt="name_song"
                        />
                        <div className={cx('des-song')}>
                            <span className={cx('name-song')}>Chúng ta không thuộc về nhau mãi mãi</span>
                            <span className={cx('singer-song')}>Nguyễn Quốc Tuấn, Sơn Tùng MTP </span>
                        </div>
                    </div>

                    <div>
                        <i style={{ marginRight: '18px' }} className="fa-regular fa-heart"></i>
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
                <div className={cx('center-player-bar')}>
                    <audio id="audio" ref={audioRef} controls style={{ display: ' none' }}>
                        <source src={audioSrc} type="audio/mp3" />
                    </audio>
                    <div className={cx('control-song-icon')}>
                        <i className="fa-solid fa-shuffle"></i>
                        <i className="fa-solid fa-backward-step"></i>
                        <div className={cx('cover-icon-play')} onClick={toggle}>
                            {playing ? (
                                <i className="fa-solid fa-pause"></i>
                            ) : (
                                <i style={{ marginLeft: '3px' }} className="fa-solid fa-play"></i>
                            )}
                        </div>
                        <i className="fa-solid fa-forward-step"></i>
                        <i className="fa-solid fa-repeat"></i>
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
