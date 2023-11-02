import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import logo from '../../../assets/images/logo.svg';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function SideBar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo')}>
                    <img src={logo} alt="sound mp3" className={cx('design-logo')} />
                </div>
                <div className={cx('content-sidebar')}>
                    <NavLink to="/" className={(nav) => cx('sidebar-nav', { active: nav.isActive })}>
                        <div>
                            <i className={cx('fa-solid fa-compact-disc')}></i> <span>Khám Phá</span>
                        </div>
                    </NavLink>

                    <NavLink to="/favorite" className={(nav) => cx('sidebar-nav', { active: nav.isActive })}>
                        <div>
                            <i className={cx('fa-solid fa-headphones')}></i> <span>Yêu Thích</span>
                        </div>
                    </NavLink>

                    <NavLink to="/category" className={(nav) => cx('sidebar-nav', { active: nav.isActive })}>
                        <div>
                            <i className="fa-solid fa-icons"></i> <span>Thể Loại</span>
                        </div>
                    </NavLink>

                    <NavLink to="/upload" className={(nav) => cx('sidebar-nav', { active: nav.isActive })}>
                        <div>
                            <i className="fa-solid fa-file-audio"></i> <span>Upload</span>
                        </div>
                    </NavLink>
                </div>
                <div className={cx('line')}></div>
            </div>
        </div>
    );
}

export default SideBar;
