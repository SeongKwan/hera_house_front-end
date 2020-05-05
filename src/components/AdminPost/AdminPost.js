import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './AdminPost.module.scss';
import classNames from 'classnames/bind';
import TableBoard from '../TableBoard/TableBoard';

const cx = classNames.bind(styles);

@withRouter
class AdminPost extends Component {
    _handleClickOnButtonAddPost = () => {
        this.props.history.push(`/admin/post/write`);
    }

    render() {
        return (
            <main className={cx('AdminPost')}>
                <button className={cx('button-add-post')} onClick={this._handleClickOnButtonAddPost}>글작성</button>
                <TableBoard />
            </main>
        );
    }
}

export default AdminPost;