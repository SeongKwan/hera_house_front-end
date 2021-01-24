import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './AdminPost.module.scss';
import classNames from 'classnames/bind';
import TableBoard from '../TableBoard/TableBoard';
import {
    isMobile,
    isBrowser,
    BrowserView,
    MobileView
} from "react-device-detect";
import TableBoardMobile from '../TableBoardMobile/TableBoardMobile';
import { IoMdAdd } from 'react-icons/io';

const cx = classNames.bind(styles);

@withRouter
class AdminPost extends Component {
    _handleClickOnButtonAddPost = () => {
        this.props.history.push(`/admin/post/write`);
    }

    render() {
        return (
            <main className={cx('AdminPost')}>
                {
                    isBrowser &&
                    <BrowserView>
                        <button className={cx('button-add-post')} onClick={this._handleClickOnButtonAddPost}>글작성</button>
                        <TableBoard />
                    </BrowserView>
                }
                {
                    isMobile &&
                    <div className={cx('post-list-container')}>
                        <button className={cx('floating-button-add-post')} onClick={this._handleClickOnButtonAddPost}><IoMdAdd className={cx('icon')} /></button>
                        <TableBoardMobile />
                    </div>
                }
            </main>
        );
    }
}

export default AdminPost;