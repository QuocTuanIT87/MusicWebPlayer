import classNames from 'classnames/bind';
import styles from './LoginForm.module.scss';
import { useState } from 'react';
import { LoginService } from '../../../service/Auth/LoginService';

const cx = classNames.bind(styles);

function LoginForm() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleLogin = async () => {
        const result = await LoginService(email, password);
        localStorage.setItem('token', result.data.token);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('inner')}>
                    <h2>Đăng nhập</h2>
                    <div className={cx('cover-contain-sign')}>
                        <div>
                            <input
                                spellCheck={false}
                                className={cx('form-input')}
                                type="text"
                                placeholder="Email assress"
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleLogin();
                                    }
                                }}
                            />
                        </div>

                        <div>
                            <input
                                spellCheck={false}
                                className={cx('form-input')}
                                type="text"
                                placeholder="Mật khẩu"
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleLogin();
                                    }
                                }}
                            />
                        </div>

                        <div className={cx('cover-btn-sign')}>
                            <button onClick={handleLogin}>Đăng nhập</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
