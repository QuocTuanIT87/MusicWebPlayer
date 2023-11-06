import classNames from 'classnames/bind';
import styles from './SignUpForm.module.scss';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { RegisterService } from '../../../service/Auth/RegisterService';
import { formContext } from '../../FormProvider/FormProvider';

const cx = classNames.bind(styles);

function SignUpForm() {
    const [email, setEmail] = useState();
    const [lastName, setLastName] = useState();
    const [firtName, setFirtName] = useState();
    const [password, setPassword] = useState();
    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();

    const contextForm = useContext(formContext);

    const handleSignUp = async () => {
        const birthay = year + '-' + month + '-' + day;
        const result = await RegisterService(email, lastName, firtName, password, birthay);
        if (result.data.errCode === 0) {
            contextForm.setIsLogin(true);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('inner')}>
                    <h2>Đăng ký</h2>
                    <div className={cx('cover-contain-sign')}>
                        <div>
                            <input
                                spellCheck={false}
                                className={cx('form-input')}
                                type="text"
                                placeholder="Email assress"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                spellCheck={false}
                                className={cx('form-input')}
                                type="text"
                                placeholder="Họ"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                spellCheck={false}
                                className={cx('form-input')}
                                type="text"
                                placeholder="Tên"
                                onChange={(e) => setFirtName(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                spellCheck={false}
                                className={cx('form-input')}
                                type="text"
                                placeholder="Mật khẩu"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={cx('title-birthday')}>
                            <label>Ngày sinh</label>
                        </div>
                        <div className={cx('cover-birthday')}>
                            <div className={cx('cover-input-birthday')}>
                                <input type="number" placeholder="Ngày" onChange={(e) => setDay(e.target.value)} />
                            </div>
                            <div className={cx('cover-input-birthday')}>
                                <input type="number" placeholder="Tháng" onChange={(e) => setMonth(e.target.value)} />
                            </div>
                            <div className={cx('cover-input-birthday')}>
                                <input type="number" placeholder="Năm" onChange={(e) => setYear(e.target.value)} />
                            </div>
                        </div>
                        <div className={cx('cover-term')}>
                            <input id="term" type="checkbox" />
                            <label htmlFor="term">
                                Tôi đồng ý với{' '}
                                <Link to="/term-conditions">
                                    <span>các điều khoản và điều kiện</span>
                                </Link>
                            </label>
                        </div>
                        <div className={cx('cover-btn-sign')}>
                            <button onClick={handleSignUp}>Đăng ký</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;
