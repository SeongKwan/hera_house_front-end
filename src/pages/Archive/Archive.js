import React, { Component } from 'react';
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import { withRouter } from "react-router";
import styles from './Archive.module.scss';
import classNames from 'classnames/bind';
import categories from '../../constants/category';
import PostList from '../../components/PostList/PostList';
import Post from '../../components/Post/Post';

const cx = classNames.bind(styles);
const cn = {
    list: 'list-main-category',
    item: 'list-item-main-category',
}

@withRouter
class Archive extends Component {
    _onClickBrandLogo = () => {
        this.props.history.push('/');
    }

    render() {
        let { path, params } = this.props.match;
        let isDetailPage = window.location.pathname.split('/').length > 3 ? true : false;
        
        return (
            <div className={cx('Archive')}>
                <header className={cx('header')}>
                    <div className={cx('wrapper-brand-logo')} onClick={this._onClickBrandLogo}>Hera House</div>
                </header>
                <div className={cx('container')}>
                    <aside className={cx('aside', {listPage: !isDetailPage})}>
                        <nav className={cx(cn.list)}>
                            {categories.map(category => {
                                const { path, name } = category;
                                return <Link key={name} to={`/archive${path}`} className={cx('link-nav-item')}><li className={cx(cn.item)}>{name}</li></Link>
                            })}
                        </nav>
                    </aside>
                    <main className={cx('main')}>
                        <Switch>
                            <Route exact path={`${path}/:category`}>
                                <PostList />
                            </Route>
                            <Route path={`${path}/:category/:postId`}>
                                <Post />
                            </Route>
                        </Switch>
                    </main>
                </div>

            </div>
        );
    }
}

export default Archive;