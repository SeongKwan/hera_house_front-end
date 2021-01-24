import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import styles from './TableBoardMobile.module.scss';
import classNames from 'classnames/bind';
import staticUrl from '../../constants/staticUrl';
import { getLocaleFullDateWithTime } from '../../utils/momentHelper';
import Loader from '../Loader/Loader';

const cx = classNames.bind(styles);

@withRouter
@inject('postStore', 'tableStore')
@observer
class TableBoardMobile extends Component {
    componentDidMount() {
        this._initialize();
    }

    componentDidUpdate(prevProps) {
        const posts = this.props.postStore.registry;
        if (prevProps.contents !== this.props.contents) {
            return this.props.tableStore.setPage(1, posts);
        } else return null;
    }

    _initialize = () => {
        this.props.postStore.loadPosts().then((posts) => {
            this.props.tableStore.setPage(1, posts);
        });
    };

    _handleClickOnListItem = (postId) => {
        this.props.history.push(`/admin/post/edit/${postId}`);
    };

    _handleClickOnToggleSwitch = (post) => {
        this.props.postStore
            .toggleIsPublishedPost(post)
            .then((res) => {
                this._initialize();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    _handleClickOnDeleteButton = (e, postId) => {
        e.preventDefault();
        e.stopPropagation();
        if (
            window.confirm(
                '삭제되면 복구할 수 없습니다. 이 글을 삭제하시겠습니까?',
            )
        ) {
            return this.props.postStore
                .deletePost(postId)
                .then((res) => {
                    this._initialize();
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        return false;
    };

    _render = () => {};

    render() {
        const { registry: posts, isLoading } = this.props.postStore;
        console.log(JSON.parse(JSON.stringify(posts)));

        return (
            <ul className={cx('TableBoardMobile')}>
                {!isLoading && posts.length === 0 && (
                    <div className={cx('empty-posts')}>
                        등록된 게시물이 없네요
                    </div>
                )}
                {isLoading && <Loader />}
                {!isLoading &&
                    posts.map((post, index) => {
                        console.log(post);
                        const {
                            _id,
                            title,
                            category,
                            subCategory,
                            type,
                            createdAt,
                            updatedAt,
                            isPublished,
                            thumbnail,
                        } = post;

                        return (
                            <li key={_id}>
                                <div className={cx('card-post')}>
                                    <div className={cx('header')}>
                                        <div className={cx('thumbnail')}>
                                            <img
                                                src={`${staticUrl}${thumbnail}`}
                                                alt="thumbnail"
                                            />
                                        </div>
                                        <div
                                            className={cx('title')}
                                            onClick={() => {
                                                this._handleClickOnListItem(
                                                    _id,
                                                );
                                            }}
                                        >
                                            {title}
                                        </div>
                                    </div>
                                    <div className={cx('body')}>
                                        <div className={cx('component')}>
                                            <div className={cx('name')}>
                                                대분류
                                            </div>
                                            <div
                                                className={cx(
                                                    'content',
                                                    'category',
                                                )}
                                            >
                                                {type}
                                            </div>
                                        </div>
                                        <div className={cx('component')}>
                                            <div className={cx('name')}>
                                                중분류
                                            </div>
                                            <div
                                                className={cx(
                                                    'content',
                                                    'category',
                                                )}
                                            >
                                                {category}
                                            </div>
                                        </div>
                                        <div className={cx('component')}>
                                            <div className={cx('name')}>
                                                소분류
                                            </div>
                                            <div
                                                className={cx(
                                                    'content',
                                                    'category',
                                                )}
                                            >
                                                {subCategory}
                                            </div>
                                        </div>
                                        <div className={cx('component')}>
                                            <div className={cx('name')}>
                                                생성일자
                                            </div>
                                            <div className={cx('content')}>
                                                {getLocaleFullDateWithTime(
                                                    createdAt,
                                                )}
                                            </div>
                                        </div>
                                        <div className={cx('component')}>
                                            <div className={cx('name')}>
                                                수정일자
                                            </div>
                                            <div className={cx('content')}>
                                                {updatedAt > 0
                                                    ? getLocaleFullDateWithTime(
                                                          updatedAt,
                                                      )
                                                    : '-'}
                                            </div>
                                        </div>
                                        <div className={cx('component')}>
                                            <div className={cx('name')}>
                                                공개상태
                                            </div>
                                            <div className={cx('content')}>
                                                <div
                                                    className={cx(
                                                        'wrapper-toggle-switch',
                                                    )}
                                                >
                                                    <input
                                                        className={cx(
                                                            'toggle-switch',
                                                        )}
                                                        type="checkbox"
                                                        id={`switch-${_id}`}
                                                        checked={isPublished}
                                                        onChange={() => {
                                                            this._handleClickOnToggleSwitch(
                                                                post,
                                                            );
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={`switch-${_id}`}
                                                    >
                                                        Toggle
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('footer')}>
                                        <button
                                            className={cx('button-delete')}
                                            onClick={(e) => {
                                                this._handleClickOnDeleteButton(
                                                    e,
                                                    _id,
                                                );
                                            }}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        );
    }
}

export default TableBoardMobile;
