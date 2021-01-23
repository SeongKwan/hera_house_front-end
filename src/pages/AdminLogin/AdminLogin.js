import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styles from './AdminLogin.module.scss';
import classNames from 'classnames/bind';
import { inject, observer } from 'mobx-react';
import { FiMail, FiLock } from 'react-icons/fi';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { isMobile } from 'react-device-detect';
import Cursor from '../../components/Cursor/Cursor';

const cx = classNames.bind(styles);

@withRouter
@inject('authStore', 'loginStore')
@observer
class AdminLogin extends Component {
    componentWillUnmount() {
        this.props.loginStore.clearInputValuesForLogin();
    }

    _handleChangeOnInput = (e) => {
        const { value, name: type } = e.target;
        this.props.loginStore.changeInput(type, value);
    };

    _handleClickOnButtonLogin = () => {
        this.props.authStore
            .login()
            .then((res) => {
                this.props.history.push('/admin');
            })
            .catch((err) => {
                if (!err.success) {
                    window.alert('관리자계정 또는 비밀번호를 확인해 주세요.');
                }
            });
    };

    _handleClickOnButtonBack = () => {
        this.props.history.push('/');
    };

    render() {
        const { email, password } = this.props.loginStore.inputValuesForLogin;
        const disabledButton = email.length <= 0 || password.length <= 0;

        return (
            <div className={cx('AdminLogin')}>
                {!isMobile && <Cursor />}
                <div className={cx('title')}>관리자 로그인</div>
                <div className={cx('form')}>
                    <div className={cx('wrapper-input')}>
                        <FiMail className={cx('icon')} />
                        <input
                            className={cx('input', 'input-email')}
                            name="email"
                            autoFocus
                            id="email"
                            type="text"
                            placeholder="관리자 계정"
                            onChange={this._handleChangeOnInput}
                            value={email}
                        />
                        <label htmlFor="email">계정</label>
                    </div>
                    <div className={cx('wrapper-input')}>
                        <FiLock className={cx('icon')} />
                        <input
                            className={cx('input', 'input-password')}
                            name="password"
                            id="password"
                            type="password"
                            autoComplete="off"
                            placeholder="비밀번호"
                            onChange={this._handleChangeOnInput}
                            onKeyDown={(e) => {
                                if (password.length >= 8) {
                                    if (e.keyCode === 13) {
                                        return this._handleClickOnButtonLogin();
                                    }
                                } else {
                                    if (e.keyCode === 13) {
                                        return window.alert(
                                            '비밀번호는 최소 8자리 입니다.',
                                        );
                                    }
                                }
                            }}
                            value={password}
                        />
                        <label htmlFor="password">비밀번호</label>
                    </div>
                    <button
                        disabled={disabledButton}
                        className={cx('button-login', {
                            disabled: disabledButton,
                        })}
                        onClick={this._handleClickOnButtonLogin}
                        onKeyDown={(e) => {
                            if (e.keyCode === 27) {
                                this._handleClickOnButtonLogin();
                            }
                        }}
                    >
                        로그인
                    </button>
                    <button
                        className={cx('button-back')}
                        onClick={this._handleClickOnButtonBack}
                    >
                        <FaLongArrowAltLeft className={cx('icon')} />
                        사이트로 돌아가기
                    </button>
                </div>
            </div>
        );
    }
}

export default AdminLogin;
