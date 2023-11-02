import classNames from 'classnames/bind';

import './DefaultLayout.module.scss';
import Header from '../components/Header';
import SideBar from '../components/Sidebar/Sidebar';
import MusicPlayerBar from '../components/MusicPlayerBar';
import Content from '../components/Content';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('layout-panel')}>
                <div className={cx('sidebar-panel')}>
                    <SideBar />
                </div>
                <div className={cx('right-sidebar-panel')}>
                    <div className={cx('header-panel')}>
                        <Header />
                    </div>
                    <div className={cx('content-panel')}>
                        <Content>{children}</Content>
                    </div>
                </div>
            </div>
            <div className={cx('player-bar')}>
                <MusicPlayerBar />
            </div>
        </div>
    );
}

export default DefaultLayout;
