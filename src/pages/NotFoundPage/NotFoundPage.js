import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styles from './NotFoundPage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

@withRouter
class NotFoundPage extends Component {
    _onClickBackButton = () => {
        this.props.history.replace('/');
    }
    render() {
        return (
            <div className={cx('NotFoundPage')}>
                <h6>찾으시는 페이지가 없는 듯하네요.</h6>
                <button onClick={this._onClickBackButton}>처음화면으로...</button>
            </div>
        );
    }
}

export default NotFoundPage;