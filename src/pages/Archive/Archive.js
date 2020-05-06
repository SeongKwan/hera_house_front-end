import React, { Component } from 'react';
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import { withRouter } from "react-router";
import { inject, observer } from 'mobx-react';
import styles from './Archive.module.scss';
import classNames from 'classnames/bind';
import PostList from '../../components/PostList/PostList';
import Post from '../../components/Post/Post';
import { IoIosArrowUp, IoIosArrowRoundForward, IoIosSettings } from "react-icons/io";

const cx = classNames.bind(styles);
const cn = {
    list: 'list-main-category',
    item: 'list-item-main-category',
}

@withRouter
@inject('categoryStore', 'loginStore')
@observer
class Archive extends Component {
    state = { isSeen: false, isVisibleCategory: false }

    componentDidMount() {
        this.props.categoryStore.loadCategories();
        window.addEventListener("scroll", this._showTopScrollButton);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this._showTopScrollButton);
    }

    _showTopScrollButton = () => {
        let { scrollY } = window,
            { scrollHeight } = this.mainContainer;
        let touchDown = ((scrollY / scrollHeight) > 0.1) || scrollY > 100;

        if (touchDown && !this.state.isSeen) {
            this.setState({isSeen: true});
        } else if (!touchDown && this.state.isSeen) {
            this.setState({isSeen: false});
        }
    }

    _onClickBrandLogo = () => {
        this.props.history.push('/');
    }

    _handleClickOnDropdown = () => {
        console.log('clcik dorpdown')
        this.setState({ isVisibleCategory: !this.state.isVisibleCategory});
    }

    _onClickTopScrollButton = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    render() {
        const categories = this.props.categoryStore.registry;
        const currentCategory = this.props.location.pathname.split('/')[2];
        const { isLoggedIn } = this.props.loginStore;
        let { path } = this.props.match;
        let isDetailPage = window.location.pathname.split('/').length > 3 ? true : false;

        return (
            <div className={cx('Archive')}>
            {
                isLoggedIn &&
                <div className={cx('floating-container')}>
                    <button onClick={()=>this.props.history.push('/admin')}><IoIosSettings className={cx('icon')} /></button>
                </div>
            }
                <header className={cx('header')}>
                    <div className={cx('wrapper-brand-logo')} data-device="desktop" onClick={this._onClickBrandLogo}>Hera House</div>
                    <div className={cx('wrapper-brand-logo')} data-device="mobile">
                        <span onClick={this._onClickBrandLogo}>HH</span>
                        <div className={cx('button-admin')} onClick={()=>this.props.history.push('/admin')}>
                        <div className={cx('wrapper-button-admin')}><IoIosSettings className={cx('icon')} /></div></div>
                    </div>
                    <div className={cx('container-dropmenu-category')}>
                        <div className={cx('current-category')}>
                            <span onClick={this._handleClickOnDropdown}>{currentCategory}</span>
                            <ul className={cx('dropmenu-list', {isVisible: this.state.isVisibleCategory}, {notVisible: !this.state.isVisibleCategory})}>
                                {categories.map((category, i) =>{ 
                                    if (category.name !== currentCategory) {
                                        return <Link key={i} to={`/archive/${category.name}`} className={cx('dropmenu-link')}><li className={cx('dropmenu-item')}>{category.name}</li></Link>
                                    }
                                    return false;
                                    }
                                )}
                            </ul>
                        </div>
                    </div>
                    
                </header>

                
                <div className={cx('container')}>
                    <aside className={cx('aside', {listPage: !isDetailPage})}>
                        <nav className={cx(cn.list)}>
                            {categories.map(category => {
                                const { name } = category;
                                return <Link key={name} to={`/archive/${name}`} className={cx('link-nav-item')}><li className={cx(cn.item, {selected: currentCategory === name})}>{name}</li></Link>
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