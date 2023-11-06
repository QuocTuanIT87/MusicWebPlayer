import styles from './FormAuth.module.scss';
import classNames from 'classnames/bind';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useContext } from 'react';
import ImageSign from '../../assets/images/form2.jpg';
import { formContext } from '../FormProvider/FormProvider';

const cx = classNames.bind(styles);

function FormAuth() {
    const contextForm = useContext(formContext);

    return (
        <div className={cx('wrapper')} onClick={contextForm.hideShowForm}>
            <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('cover-image', { active: contextForm.isLogin })}>
                    {contextForm.isLogin && (
                        <div className={cx('cover-img-login')}>
                            <img src={ImageSign} alt="image_form" />
                        </div>
                    )}

                    {!contextForm.isLogin && (
                        <div className={cx('cover-img-sign')}>
                            <img src={ImageSign} alt="image_form" />
                        </div>
                    )}
                </div>
                <div className={cx('cover-form', { active: contextForm.isLogin })}>
                    <div className={cx('cover-btn-switch')}>
                        <div className={cx('btn-login')}>
                            <button
                                className={cx({ active: contextForm.isLogin })}
                                onClick={() => contextForm.setIsLogin(true)}
                            >
                                Login
                            </button>
                        </div>
                        <div className={cx('btn-signup')}>
                            <button
                                className={cx({ active: !contextForm.isLogin })}
                                onClick={() => contextForm.setIsLogin(false)}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                    {contextForm.isLogin ? <LoginForm /> : <SignUpForm />}
                    <div className={cx('cover-end-form')}>
                        {contextForm.isLogin && (
                            <p>
                                Bạn chưa có tài khoản? Click{' '}
                                <span onClick={() => contextForm.setIsLogin(false)}>sign up</span> để đăng ký
                            </p>
                        )}
                        {!contextForm.isLogin && (
                            <p>
                                Bạn đã có tài khoản? Click{' '}
                                <span onClick={() => contextForm.setIsLogin(true)}>login</span> để đăng nhập
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormAuth;
