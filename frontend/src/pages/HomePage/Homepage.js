import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { GetListSongService } from '../../service/Song/GetListSongService';
import AudioItem from '../components/AudioItem/AudioItem';

const cx = classNames.bind(styles);

function HomePage() {
    const [listSong, setListSong] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await GetListSongService();
            setListSong(result?.data?.listSong);
        };
        fetchAPI();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('slider-animation')}></div>
                <div className={cx('main-content')}>
                    <h2>Danh sách bài hát</h2>

                    <div className={cx('contain-list-song')}>
                        {listSong?.map((song, index) => (
                            <AudioItem key={index} song={song} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
