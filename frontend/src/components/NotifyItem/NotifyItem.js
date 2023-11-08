import styles from './NotifyItem.module.scss';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { formContext } from '../FormProvider/FormProvider';
import message from '../Message';

const cx = classNames.bind(styles);

function NotifyItem() {
    const contextForm = useContext(formContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, [1000]);
    }, []);

    const handleHideForm = () => {
        contextForm.setIsShowFormUpload(false);
    };

    return (
        <div className={cx('wrapper')} onClick={handleHideForm}>
            <div className={cx('container')}>
                <div className={cx('inner')}>
                    <div className={cx('content')}>
                        {!loading && <i className={cx('fa-regular fa-circle-check fa-beat', 'mr-8')}></i>}
                        {loading && <ClipLoader color={'#fff'} size={60} />}
                        {!loading && message.successUpload}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotifyItem;
