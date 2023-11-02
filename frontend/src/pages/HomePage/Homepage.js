import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';
import image from '../../assets/images/Chill Coding_Programming Lo-fi Animation.jpg';
import playIngIcon from '../../assets/images/icon-playing.gif';
import { useState } from 'react';

const cx = classNames.bind(styles);

function HomePage() {
    const [playing, setPlaying] = useState(true);

    const toggle = () => setPlaying(!playing);

    const songItems = Array(10).fill(null);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('slider-animation')}></div>
                <div className={cx('main-content')}>
                    <h2>Danh sách bài hát</h2>

                    <div className={cx('contain-list-song')}>
                        {songItems.map((song) => (
                            <div className={cx('info-a-song')}>
                                <div className={cx('cover-img')} onClick={toggle}>
                                    <img src={image} alt="avatar_song" />
                                    {playing ? (
                                        <img src={playIngIcon} alt="playing_icon" className={cx('playing-icon')} />
                                    ) : (
                                        <i className={cx('fa-solid fa-play', 'play-icon')}></i>
                                    )}
                                </div>
                                <div className={cx('des-song')}>
                                    <span className={cx('song-name')}>Hơn 1000 Năm Sau</span>
                                    <span className={cx('singer-name')}>Quốc Thiên</span>
                                    <span className={cx('time-upload')}>Hôm kia</span>
                                </div>
                                <i class={cx('fa-solid fa-ellipsis', 'option-icon')}></i>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
