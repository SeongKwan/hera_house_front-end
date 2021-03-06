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
@inject('postStore', 'categoryStore')
@observer
class PostList extends Component {
    componentDidMount() {
        // const { currentCategory } = this.props.categoryStore;
        // const { filteredRegistry } = this.props.postStore;
        const currentCategoryFromURL = this.props.match.params.category;
        // let isRequiredReload = currentCategoryFromURL !== currentCategory;
        this.props.categoryStore.setCurrentCategory(currentCategoryFromURL);
        this._initialize();
    }

    componentDidUpdate(prevProps) {
        const prevCategory = prevProps.match.params.category;
        const currentCategoryFromURL = this.props.match.params.category;
        if (prevCategory !== currentCategoryFromURL) {
            this.props.categoryStore.setCurrentCategory(currentCategoryFromURL);
            this._initialize();
        }
    }

    componentWillUnmount() {

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
        const { category } = this.props.match.params;
        const { url } = this.props.match;
        let { filteredRegistry: posts, isLoading, postsLength, finedPosts } = this.props.postStore;

        if (posts === null && posts === undefined) {
            return <div className={cx('PostList')}>
            </div>
        }

        return (
            <div className={cx('PostList', { 'no-posts': posts.length < 1 })}>
                {
                    (postsLength > 0) && !isLoading &&
                    finedPosts.map((post, i) => {
                        const { isPublished } = post;
                        if (isPublished) {
                            return <Link key={i} to={`${url}/${post._id}`} className={cx('list-item-post', { 'list-item-post--clothing': category === 'Clothing' })}>
                                <img className={cx({ img: category !== 'Clothing' }, { 'img--clothing': category === 'Clothing' })} src={`${staticUrl}/${post.thumbnail}`} alt="post thumbnail" />
                            </Link>
                        } else {
                            return false;
                        }
                    })
                }
                {
                    (postsLength === 0) && !isLoading &&
                    <div className={cx('no-posts')}>
                        <img src={disapointedFace} alt="no results" />
                        <p>여기에는 아직 글이 없네요....ㅠㅠ</p>
                    </div>
                }
            </div>
        )
    }
}

export default PostList;