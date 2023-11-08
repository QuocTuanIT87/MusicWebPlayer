import { useContext, useEffect } from 'react';
import styles from './ProfilePage.module.scss';
import classNames from 'classnames/bind';
import { authContext } from '../../components/AuthProvider/AuthProvider';
import tiktok from '../../assets/images/tiktok.png';
import instagram from '../../assets/images/instagram.png';
import facebook from '../../assets/images/facebook.png';
import AudioItem from '../components/AudioItem/AudioItem';
import { useNavigate } from 'react-router-dom';
import { GetCurrentUser } from '../../service/Auth/GetCurrentUser';

const cx = classNames.bind(styles);

function ProfilePage() {
    const contextAuth = useContext(authContext);

    const navigate = useNavigate();

    useEffect(() => {
        const blurAvatar = document.querySelector(`.${cx('blur-avatar')}`);
        blurAvatar.style.backgroundImage = `url(${contextAuth.user?.avatar})`;

        const fetchAPI = async () => {
            const result = await GetCurrentUser();
            if (!result) {
                navigate('/');
            }
        };
        fetchAPI();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('wrapper-info-profile')}>
                    <div className={cx('blur-avatar')}></div>
                    <div className={cx('container-info')}>
                        <div className={cx('cover-image')}>
                            <img src={contextAuth.user?.avatar} alt="profile-user" />
                        </div>
                        <div className={cx('cover-detail-info')}>
                            <div className={cx('nickname')}>
                                <p>{contextAuth.user?.firstName}</p>
                                <span className={cx('cover-play-icon')}>
                                    <i className="fa-solid fa-play"></i>
                                </span>
                            </div>
                            <div className={cx('content-social')}>
                                <div className={cx('cover-social-network')}>
                                    <a href="https://tiktok.com">
                                        <div className={cx('cover-img-social')}>
                                            <img src={tiktok} alt="" />
                                        </div>
                                    </a>
                                    <a href="https://instagram.com">
                                        <div className={cx('cover-img-social')}>
                                            <img src={instagram} alt="" />
                                        </div>
                                    </a>
                                    <a href="https://facebook.com/TuanIT87">
                                        <div className={cx('cover-img-social')}>
                                            <div className={cx('cover-img-social')}>
                                                <img src={facebook} alt="" />
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className={cx('cover-func-follow')}>
                                    <span>1M người theo dõi</span>
                                    <button>
                                        <i className="fa-solid fa-user-plus"></i> THEO DÕI
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('list-songs')}>
                <div className={cx('contain-list-song')}>
                    {contextAuth.user?.songs.map((song, index) => (
                        <AudioItem key={index} song={song} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
