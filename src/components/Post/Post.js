import React, { Component } from 'react';
import { withRouter } from "react-router";
import styles from './Post.module.scss';
import classNames from 'classnames/bind';
import Markdown from 'react-markdown';
import './Post.css';
import { inject, observer } from 'mobx-react';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

@withRouter
@inject('postStore', 'categoryStore')
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

    render() {
        const { thePost } = this.props.postStore;
        const { currentCategory } = this.props.categoryStore;
        const {
            _id,
            title,
            content
        } = thePost;

        if (!!title === false) {
            return <div></div>
        } 

        return (
            <article className={cx('Post', 'Post-CSS')}>
                <Helmet>
                    <title>HR Post - {title}</title>
                    <link rel="canonical" href={`http://hera-house.site/archive/${currentCategory}/${_id}`} />
                    <meta http-equiv="Title" content={`HH Post - ${title}`} />
                    {/* <meta name="Keywords" content="fashion, brand, design, art, music" /> */}
                    {/* <meta name="Description" content="Hera House Archive" /> */}
                </Helmet>
                <section className={cx('section')}>
                    <Markdown 
                        escapeHtml={false}
                        source={content} 
                    />
                </section>
            </article>
        );
    }
}

export default Post;