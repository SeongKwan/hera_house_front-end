import React, { Component } from 'react'
import styles from './PostList.module.scss';
import classNames from 'classnames/bind';
import posts from '../../constants/posts';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import color from '../../styles/img/color.jpg';

const cx = classNames.bind(styles);

@withRouter
class PostList extends Component {
    render() {
        const { url } = this.props.match;
        
        return (
            <div className={cx('PostList')}>
                {posts.map((post, i) => {
                    return <Link key={i} to={`${url}/${post.id}`} className={cx('list-item-post')}><img className={cx('img')} src={color} alt="listitem" /></Link>
                })}
            </div>
        )
    }
}

export default PostList;