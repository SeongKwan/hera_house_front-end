import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import styles from './LayoutAdminMain.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

@withRouter
@inject('authStore', 'loginStore')
@observer
class LayoutAdminMain extends Component {
    _handleClickOnLogo = () => {
        this.props.history.push('/admin');
    }

    _handleClickOnButtonLogout = () => {
        if (window.confirm('관리자님, 로그아웃 하실 건가요?')) {
            return this.props.authStore.logout()
                .then(res => {
                    this.props.history.push('/');
            })
        }
        return;
    }

    render() {
        const { path } = this.props;
        return (
            <div className={cx('LayoutAdminMain')}>
                <aside className={cx('aside')}>
                    <div className={cx('logo')} onClick={this._handleClickOnLogo}>
                        Hera House Manager
                    </div>
                    <ul className={cx('list-category')}>
                        <li className={cx('list-item-wrapper')}>
                            <Link 
                                className={cx('list-item-category')} 
                                to={`${path}/category`}>
                                카테고리 관리
                            </Link>
                        </li>
                        <li className={cx('list-item-wrapper')}>
                            <Link 
                                className={cx('list-item-category')} 
                                to={`${path}/post`}>
                                게시물 관리
                            </Link>
                        </li>
                        <li className={cx('list-item-wrapper')}>
                            <Link 
                                className={cx('list-item-category')} 
                                to={`${path}/manual`}>
                                사이트 사용설명서
                            </Link>
                        </li>
                    </ul>
                    <footer className={cx('footer')}>
                        <button className={cx('button-logout')} onClick={this._handleClickOnButtonLogout}>로그아웃</button>
                        <Link 
                            className={cx('link-to-site')} 
                            to={`/`}>
                            <FaLongArrowAltLeft className={cx('icon')} /><span>사이트로 돌아가기</span>
                        </Link>
                        <div className={cx('footer-content')}>2020 Hera House</div>
                    </footer>
                </aside>
                <main className={cx('main')}>
                    <div className={cx('div')}>
                        {this.props.children}
                    </div>
                </main>
            </div>
        )
    }
}

export default LayoutAdminMain;
