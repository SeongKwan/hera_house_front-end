import React, { Component } from 'react';
import {
    Switch,
    Route,
    // Link
} from "react-router-dom";
import { withRouter } from "react-router";
import { inject, observer } from 'mobx-react';
import { Helmet } from 'react-helmet';
import styles from './Archive.module.scss';
import classNames from 'classnames/bind';
import PostList from '../../components/PostList/PostList';
import Post from '../../components/Post/Post';
import { IoIosArrowUp, IoIosSettings } from "react-icons/io";
import NavBar from '../../components/Navbar/NavBar';
// import { IoLogoInstagram } from 'react-icons/io';
// import { TiSocialPinterest } from 'react-icons/ti';
// import { AiOutlineYoutube } from 'react-icons/ai';
import sns from '../../constants/sns';

const cx = classNames.bind(styles);

@withRouter
@inject('categoryStore', 'loginStore', 'commonStore')
@observer
class Archive extends Component {
    state = { isShownScrollButton: false, openMenu: false }

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
            this.setState({ isShownScrollButton: true });
        } else if (!touchDown && this.state.isShownScrollButton) {
            this.setState({ isShownScrollButton: false });
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



    _handleOnClickSns = (e, type) => {
        return window.open(sns[type], '_blank');
    }

    render() {
        // const categories = this.props.categoryStore.registry;
        const currentCategory = this.props.location.pathname.split('/')[2];
        const { isLoggedIn } = this.props.loginStore;
        let { path } = this.props.match;

        return (
            <div className={cx('Archive', { 'no-scroll': this.state.openMenu })}>
                <Helmet>
                    <title>HR Archive - {currentCategory}</title>
                    <link rel="canonical" href={`http://hr-archive/archive/${currentCategory}`} />
                    <meta http-equiv="Title" content={`HR Archive - ${currentCategory}`} />
                    <meta name="Keywords" content="fashion, brand, design, art, music" />
                    <meta name="Description" content="HR Archive Archive" />
                </Helmet>
                {
                    isLoggedIn &&
                    <div className={cx('floating-container')}>
                        <button onClick={() => this.props.history.push('/admin')}><IoIosSettings className={cx('icon')} /></button>
                    </div>
                }
                {/* <header className={cx('header')}>
                    <div className={cx('wrapper-brand-logo')} data-device="desktop" onClick={this._handleClickOnBrandLogo}><span>Hera House</span></div>
                    <div className={cx('wrapper-brand-logo')} data-device="mobile">
                        <span onClick={this._handleClickOnBrandLogo}>HR</span>
                    </div>
                </header> */}
                <NavBar />
                <div className={cx('container', { 'covered-menu': this.state.openMenu })}>
                    <main className={cx('main')} ref={ref => this.mainContainer = ref}>
                        <div className={cx('current-category')}>
                            {currentCategory}
                        </div>
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


            </div>
        );
    }
}

export default Archive;