import React, { Component } from 'react';
import { withRouter } from "react-router";
import styles from './Post.module.scss';
import classNames from 'classnames/bind';
import Markdown from 'react-markdown';
import './Post.css';
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(styles);

@withRouter
@inject('postStore')
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
        const {
            // title,
            content
        } = thePost;

        return (
            <article className={cx('Post', 'Post-CSS')}>
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