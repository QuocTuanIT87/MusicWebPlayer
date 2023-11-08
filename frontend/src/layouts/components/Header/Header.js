import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import userProfileImage from '../../../assets/images/user-profile.png';
import FormAuth from '../../../components/FormAuth';
import { useContext } from 'react';
import { formContext } from '../../../components/FormProvider/FormProvider';
import { authContext } from '../../../components/AuthProvider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
    const contextForm = useContext(formContext);
    const contextAuth = useContext(authContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        contextAuth.setUser(null);
        contextAuth.setLogged(false);
        navigate('/');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('cover-search-song')}>
                    <div className={cx('search-songs')}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            spellCheck={false}
                            className={cx('form-control-search')}
                            type="text"
                            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                        ></input>
                    </div>
                </div>
                <div className={cx('profile-setting')}>
                    <i className="fa-solid fa-gear"></i>
                    <div className={cx('cover-img-user')}>
                        <img src={userProfileImage} alt="user-profile" />
                        {!contextAuth.user && (
                            <div className={cx('modal')}>
                                <div className={cx('inner-modal')}>
                                    <div>
                                        <button
                                            className={cx('btn-login')}
                                            onClick={() => {
                                                contextForm.hideShowForm();
                                                contextForm.setIsLogin(true);
                                            }}
                                        >
                                            Đăng nhập
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className={cx('btn-register')}
                                            onClick={() => {
                                                contextForm.hideShowForm();
                                                contextForm.setIsLogin(false);
                                            }}
                                        >
                                            Đăng ký
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {contextAuth.user && (
                            <div className={cx('modal')}>
                                <div className={cx('inner-modal')}>
                                    <Link to="/profile" style={{ display: 'block' }}>
                                        <div className={cx('item-menu')}>
                                            <i className="fa-regular fa-user"></i> Trang cá nhân
                                        </div>
                                    </Link>
                                    <div className={cx('item-menu')} onClick={handleLogout}>
                                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Đăng xuất
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {contextForm.isShowForm && <FormAuth />}
        </div>
    );
}

export default Header;
