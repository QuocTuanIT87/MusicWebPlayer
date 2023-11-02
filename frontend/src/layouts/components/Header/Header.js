import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import userProfileImage from '../../../assets/images/user-profile.png';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('cover-search-song')}>
                    <div className={cx('search-songs')}>
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input
                            spellCheck={false}
                            className={cx('form-control-search')}
                            type="text"
                            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                        ></input>
                    </div>
                </div>
                <div className={cx('profile-setting')}>
                    <i class="fa-solid fa-gear"></i>
                    <img src={userProfileImage} alt="user-profile" />
                </div>
            </div>
        </div>
    );
}

export default Header;
