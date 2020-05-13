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
import { IoIosArrowUp, IoIosSettings } from "react-icons/io";
import Sidebar from '../../components/Sidebar/Sidebar';

const cx = classNames.bind(styles);

@withRouter
@inject('categoryStore', 'loginStore', 'commonStore')
@observer
class Archive extends Component {
    state = { isShownScrollButton: false , openMenu: false}

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

        if (touchDown && !this.state.isShownScrollButton) {
            this.setState({isShownScrollButton: true});
        } else if (!touchDown && this.state.isShownScrollButton) {
            this.setState({isShownScrollButton: false});
        }
    }

    _handleClickOnBrandLogo = () => {
        this.props.history.push('/');
    }

    _handleClickOnTopScrollButton = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    _handleClickOnToggleMenu() {
        this.setState({
            openMenu: !this.state.openMenu
        });
    }

    _handleClickOnListItemInMenu = () => {
        this.setState({
            openMenu: !this.state.openMenu
        });
    }

    render() {
        const categories = this.props.categoryStore.registry;
        const currentCategory = this.props.location.pathname.split('/')[2];
        const { isLoggedIn } = this.props.loginStore;
        let { path } = this.props.match;

        return (
            <div className={cx('Archive')}>
            {
                isLoggedIn &&
                <div className={cx('floating-container')}>
                    <button onClick={()=>this.props.history.push('/admin')}><IoIosSettings className={cx('icon')} /></button>
                </div>
            }
                <header className={cx('header')}>
                    <div className={cx('wrapper-brand-logo')} data-device="desktop" onClick={this._handleClickOnBrandLogo}><span>Hera House</span></div>
                    <div className={cx('wrapper-brand-logo')} data-device="mobile">
                        <span onClick={this._handleClickOnBrandLogo}>HH</span>
                    </div>
                </header>
                <div className={cx('container', {'covered-menu': this.state.openMenu})}>
                    <Sidebar />
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
                            this.state.isShownScrollButton && 
                            <div className={cx('wrapper-button-top-scroll')}>
                                <div className={cx('wrapper-icon')} onClick={this._handleClickOnTopScrollButton}>
                                    <IoIosArrowUp className={cx('icon')} />
                                </div>
                            </div>
                        }
                    </main>
                </div>

                <div className={cx('wrapper-toggle-menu')}>
                    <input 
                        ref={ref => this.menuCheckbox = ref}
                        className={cx("input-checkbox-menu")} 
                        hidden
                        type="checkbox" 
                        id="navi-toggle" />
                    <label 
                        onClick={() => this._handleClickOnToggleMenu()}
                        className={cx('label-menu', "hamburger-menu")} 
                        htmlFor="navi-toggle" >
                        <span>{currentCategory}</span>
                        <span className={cx("icon-menu", {'open-menu': this.state.openMenu})}>&nbsp;</span>
                    </label>
                </div>
                <ul className={cx('menu-list', {'going-in': this.state.openMenu})}>
                    {categories.map((category, i) =>{ 
                        const { name } = category;
                        return <Link key={name} to={`/archive/${name}`} className={cx('nav-link')}><li onClick={this._handleClickOnListItemInMenu} className={cx('list-item', {selected: currentCategory === name})}>{name}</li></Link>
                        })
                    }
                    {
                        isLoggedIn &&
                        <div className={cx('button-admin', {'open-menu': this.state.openMenu})} onClick={()=>this.props.history.push('/admin')}>
                            <div className={cx('wrapper-button-admin')}><IoIosSettings className={cx('icon')} /></div>
                        </div>
                    }
                </ul>
            </div>
        );
    }
}

export default Archive;