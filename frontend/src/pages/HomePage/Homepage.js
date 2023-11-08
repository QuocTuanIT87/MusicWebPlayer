import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import AudioItem from '../components/AudioItem/AudioItem';
import { songContext } from '../../components/SongProvider/SongProvider';
const cx = classNames.bind(styles);

function HomePage() {
    const contextSong = useContext(songContext);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('slider-animation')}></div>
                <div className={cx('main-content')}>
                    <h2>Danh sách bài hát</h2>

                    <div className={cx('contain-list-song')}>
                        {contextSong.listSongHome?.map((song, index) => (
                            <AudioItem key={index} song={song} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
