import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import styles from './AdminPostWrite.module.scss';
import classNames from 'classnames/bind';
import Editor from '../Editor/Editor';
import Cursor from '../Cursor/Cursor';

import { isMobile } from 'react-device-detect';
const cx = classNames.bind(styles);

@withRouter
@inject('postStore')
@observer
class AdminPostWrite extends Component {
    render() {
        return (
            <div className={cx('AdminPostWrite')}>
                {!isMobile && <Cursor />}
                <Editor type={this.props.type} />
            </div>
        );
    }
}

export default AdminPostWrite;
