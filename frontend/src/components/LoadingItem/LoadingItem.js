import styles from './LoadingItem.module.scss';
import classNames from 'classnames/bind';
import { PacmanLoader } from 'react-spinners';

const cx = classNames.bind(styles);

function LoadingItem() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <PacmanLoader color={'#9b4de0'} size={46} />
            </div>
        </div>
    );
}

export default LoadingItem;
