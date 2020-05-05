import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames/bind';
import styles from './TableBoard.module.scss';
import { getLocaleFullDateWithTime } from '../../utils/momentHelper';
import { FiChevronLeft, FiChevronsLeft, FiChevronsRight, FiChevronRight } from "react-icons/fi";

const cx = classNames.bind(styles);

@withRouter
@inject('tableStore', 'postStore')
@observer
class TableBoard extends Component {
    componentDidMount() {
        this._initialize();
    }

    componentDidUpdate(prevProps) {
        const posts = this.props.postStore.registry;
        if (prevProps.contents !== this.props.contents) {
            return this.props.tableStore.setPage(1, posts);
        } else return null
    }

    _initialize = () => {
        this.props.postStore.loadPosts()
        .then(posts => {
            this.props.tableStore.setPage(1, posts);
        })
    }

    _handleClickOnListItem = (postId) => {
        this.props.history.push(`/admin/post/edit/${postId}`);
    }

    _handleClickOnToggleSwitch = (post) => {
        this.props.postStore.toggleIsPublishedPost(post)
        .then(res => {
            this._initialize();
        })
        .catch(err => {
            console.error(err);
        });
    }

    _handleClickOnDeleteButton = (e, postId) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm('삭제되면 복구할 수 없습니다. 이 글을 삭제하시겠습니까?')) {
            return this.props.postStore.deletePost(postId)
            .then(res => {
                this._initialize();
            })
            .catch(err => {
                console.error(err);
            });
        }
        return false;
    }

    render() {
        const { 
            currentPage, 
            lastPage, 
            paginatedContents, 
            pages, 
            // filter 
        } = this.props.tableStore;
        const { isLoading } = this.props;
        
        return (
            <div className={cx('TableBoard')}>
                
                <div className={cx('table-header')}>
                    {['분류', '제목', '생성일', '수정일', '발행상태', ''].map((th, i) => {return <div className={cx('table-header-data', `${i + 1}`)} key={i}>{th}</div>})}
                </div>
                <ul className={cx('table-body', {isLoading})}>
                    {
                        !isLoading ? paginatedContents.length > 0 ? paginatedContents.map((post, i) => {
                            const { _id, title, category, createdAt, updatedAt, isPublished } = post;
                            let formatedUpdatedDate;

                            let formatedCreatedDate = getLocaleFullDateWithTime(createdAt) || '-';
                            if (updatedAt > -1) {
                                formatedUpdatedDate = getLocaleFullDateWithTime(updatedAt);
                            } else {
                                formatedUpdatedDate = '-'
                            }

                                return <li key={i}>
                                    <div>{category}</div>
                                    <div className={cx('title')} onClick={() => {this._handleClickOnListItem(_id)}}>{title}</div>
                                    <div>{formatedCreatedDate || '-'}</div>
                                    {   updatedAt === null ? <div>-</div> :
                                        <div>{formatedUpdatedDate}</div>
                                    }
                                    <div className={cx('wrapper-toggle-switch')}>
                                        <input className={cx('toggle-switch')} type="checkbox" id={`switch-${_id}`} checked={isPublished} onChange={() => {this._handleClickOnToggleSwitch(post)}} /><label htmlFor={`switch-${_id}`}>Toggle</label>
                                    </div>
                                    <div>
                                        <button className={cx('button-delete')} onClick={(e) => {this._handleClickOnDeleteButton(e, _id)}}>삭제</button>
                                    </div>
                                </li>
                            })
                        : <div className={cx('no-results')}>
                            등록된 글이 없습니다
                        </div>
                        : <div>loading...</div>
                    }
                </ul>
                <ul className={cx('pagination')}>
                    <li className={cx({disabled: currentPage === 1})}>
                        <button onClick={() => this.props.tableStore.setPage(1)} disabled={currentPage === 1}><FiChevronsLeft /></button>
                    </li>
                    <li className={cx({disabled: currentPage === 1})}>
                        <button onClick={() => this.props.tableStore.setPage(currentPage - 1)} disabled={currentPage === 1}><FiChevronLeft /></button>
                    </li>
                    {pages.map((page, index) =>
                        <li key={index} className={cx({active: currentPage === page})}>
                            <button onClick={() => this.props.tableStore.setPage(page)}>{page}</button>
                        </li>
                    )}
                    <li className={cx({disabled: currentPage === lastPage || paginatedContents.length === 0})}>
                        <button onClick={() => this.props.tableStore.setPage(currentPage + 1)} disabled={currentPage === lastPage || paginatedContents.length === 0}><FiChevronRight /></button>
                    </li>
                    <li className={cx({disabled: currentPage === lastPage || paginatedContents.length === 0})}>
                        <button onClick={() => this.props.tableStore.setPage(lastPage)} disabled={currentPage === lastPage || paginatedContents.length === 0}><FiChevronsRight /></button>
                    </li>
                </ul>
            </div>
        );
    }
}

TableBoard.propTypes = {
    header: PropTypes.arrayOf(PropTypes.string),
    contents: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
}

export default TableBoard;