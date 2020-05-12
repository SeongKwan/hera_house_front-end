import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import styles from './PostList.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import staticUrl from '../../constants/staticUrl';
import disapointedFace from '../../styles/img/disappointed-face.svg';

const cx = classNames.bind(styles);

@withRouter
@inject('postStore')
@observer
class PostList extends Component {
    componentDidMount() {
        if (JSON.parse(JSON.stringify(this.props.postStore.filteredRegistry)).length <= 0) {
            this._initialize();
        }
    }

    componentDidUpdate(prevProps) {
        const prevCategory = prevProps.match.params.category;
        const currentCategory = this.props.match.params.category;
        if (prevCategory !== currentCategory) {
            this._initialize();
        }
    }

    _initialize = () => {
        const { category } = this.props.match.params;
        this.props.postStore.loadPosts()
        .then(posts => {
            this.props.postStore.filterRegistry(posts, category);
        })
        .catch(err => {
            console.error(err);
        });
    }

    render() {
        const { url } = this.props.match;
        let { filteredRegistry: posts, isLoading, postsLength } = this.props.postStore;

        if (posts === null && posts === undefined) {
            return <div className={cx('PostList')}>
            </div>
        }

        return (
            <div className={cx('PostList', {'no-posts': posts.length < 1})}>
                {   
                    (postsLength > 0) && !isLoading &&
                    posts.map((post, i) => {
                        const { isPublished } = post;
                        if (isPublished) {
                            return <Link key={i} to={`${url}/${post._id}`} className={cx('list-item-post')}>
                                <img className={cx('img')} src={`${staticUrl}/${post.thumbnail}`} alt="post thumbnail" />
                            </Link>
                        } else {
                            return false;
                        }
                    })
                }
                {
                    (postsLength === 0) && !isLoading &&
                    <div className={cx('no-posts')}>
                        <img src={disapointedFace} alt="no results"/>
                        <p>여기에는 아직 글이 없네요...ㅠㅠ</p>
                    </div>
                }
            </div>
        )
    }
}

export default PostList;