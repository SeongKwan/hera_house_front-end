import React, { Component } from 'react';
import { withRouter } from "react-router";
import styles from './Post.module.scss';
import classNames from 'classnames/bind';
import Markdown from 'react-markdown';
import './Post.css';
import { inject, observer } from 'mobx-react';
import { Helmet } from 'react-helmet';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const cx = classNames.bind(styles);

@withRouter
@inject('postStore', 'categoryStore', 'loginStore')
@observer
class Post extends Component {
    componentDidMount() {
        this._initialize();
    }

    componentWillUnmount() {
        this.props.postStore.clearThePost();
    }

    _initialize = () => {
        const { postId } = this.props.match.params;
        this.props.postStore.loadPost(postId);
    }

    _onClickBackToListButton = () => {
        this.props.history.goBack();
    }

    _handleOnClickEditButton = () => {
        const { thePost } = this.props.postStore;
        this.props.history.push(`/admin/post/edit/${thePost._id}`);
    }

    _handleOnClickUnpublishButton = (post) => {
        const THIS = this;
        this.props.postStore.toggleIsPublishedPost(post)
            .then(res => {
                THIS.props.history.goBack();
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        const { thePost } = this.props.postStore;
        const { currentCategory } = this.props.categoryStore;
        const {
            _id,
            title,
            content
        } = thePost;
        const { isLoggedIn } = this.props.loginStore;

        if (!!title === false) {
            return <div></div>
        }

        return (
            <article className={cx('Post', 'Post-CSS')}>
                <Helmet>
                    <title>{currentCategory} - {title}</title>
                    <link rel="canonical" href={`http://hr-archive.com/archive/${currentCategory}/${_id}`} />
                    <meta http-equiv="Title" content={`Post - ${title}`} />
                    {/* <meta name="Keywords" content="fashion, brand, design, art, music" /> */}
                    {/* <meta name="Description" content="Hera House Archive" /> */}
                </Helmet>
                {
                    isLoggedIn &&
                    <div className={cx('button-bar')}>
                        <button className={cx('button-post', 'button-post--edit')} onClick={this._handleOnClickEditButton}>Edit</button>
                        <button className={cx('button-post', 'button-post--unpublish')} onClick={() => { this._handleOnClickUnpublishButton(thePost) }}>Hide</button>
                    </div>
                }
                <section className={cx('section')}>
                    <div className={'ql-readOnly-container'}>
                        <ReactQuill
                            value={content}
                            readOnly={true}
                            theme="bubble"
                        />
                    </div>
                </section>
            </article>
        );
    }
}

export default Post;