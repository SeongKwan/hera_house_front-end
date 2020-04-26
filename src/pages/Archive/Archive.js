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
import { IoIosArrowUp } from "react-icons/io";

const cx = classNames.bind(styles);
const cn = {
    list: 'list-main-category',
    item: 'list-item-main-category',
}

@withRouter
class Archive extends Component {
    state = { isSeen: false }

    componentDidMount() {
        window.addEventListener("scroll", this._showTopScrollButton)
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this._showTopScrollButton)
    }

    _showTopScrollButton = () => {
        let { scrollY } = window,
            { scrollHeight } = this.mainContainer;
        let touchDown = ((scrollY / scrollHeight) > 0.3) || scrollY > 2000;

        if (touchDown && !this.state.isSeen) {
            this.setState({isSeen: true});
        } else if (!touchDown && this.state.isSeen) {
            this.setState({isSeen: false});
        }
    }

    _onClickBrandLogo = () => {
        this.props.history.push('/');
    }

    _onClickTopScrollButton = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                    <main className={cx('main')} ref={ref => this.mainContainer = ref}>
                        <Switch>
                            <Route exact path={`${path}/:category`}>
                                <PostList />
                            </Route>
                            <Route path={`${path}/:category/:postId`}>
                                <Post />
                            </Route>
                        </Switch>
                        {
                            this.state.isSeen && 
                            <div className={cx('wrapper-button-top-scroll')}>
                                <div className={cx('wrapper-icon')} onClick={this._onClickTopScrollButton}>
                                    <IoIosArrowUp className={cx('icon')} />
                                </div>
                            </div>
                        }
                    </main>
                </div>
            </div>
        );
    }
}

export default Archive;