import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import userProfileImage from '../../../assets/images/user-profile.png';
import FormAuth from '../../../components/FormAuth';
import { useContext } from 'react';
import { formContext } from '../../../components/FormProvider/FormProvider';

const cx = classNames.bind(styles);

function Header() {
    const contextForm = useContext(formContext);

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
                    </div>
                </div>
            </div>
            {contextForm.isShowForm && <FormAuth />}
        </div>
    );
}

export default Header;
