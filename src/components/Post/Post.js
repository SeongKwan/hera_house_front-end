import React, { Component } from 'react';
import { withRouter } from "react-router";
import styles from './Post.module.scss';
import classNames from 'classnames/bind';
import color from '../../styles/img/color.jpg';

const cx = classNames.bind(styles);

@withRouter
class Post extends Component {
    _onClickBackToListButton = () => {
        this.props.history.goBack();
    }

    render() {
        const { postId, category} = this.props.match.params;
        return (
            <article className={cx('Post')}>
                {/* <button className={cx('button-back-to-list')} onClick={this._onClickBackToListButton}>&lt; 목록 (<span className={cx('pascal-text')}>{category}</span>)</button> */}
                <section className={cx('section')}>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                    <figure className={cx('figure')}>
                        <img className={cx('img')} src={color} alt="color" />
                    </figure>
                </section>
            </article>
        );
    }
}

export default Post;