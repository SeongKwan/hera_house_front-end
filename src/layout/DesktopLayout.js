import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { inject, observer } from 'mobx-react';
import styles from './DesktopLayout.module.scss';
import './DesktopLayout.css';
import classNames from 'classnames/bind';
import Cursor from '../components/Cursor/Cursor';
import { xs, sm, md, lg, xl } from '../constants/breakporints';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import sns from '../constants/sns';

const cx = classNames.bind(styles);

@withRouter
@inject('categoryStore', 'loginStore', 'commonStore')
@observer
class DesktopLayout extends Component {
    state = {
        selectedCategory: '', 
        selectedSubCategory: '', 
        hamburgerOpened: false, 
        typeMenuIsOpened: false,
        mainMenuIsOpened: false, 
        subMenuIsOpened: false,
    }

    componentDidMount() {
        this.props.categoryStore.loadCategories();
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    componentWillUnmount() {
        this.setState({
            selectedCategory: '', 
            selectedSubCategory: '', 
            hamburgerOpened: false, 
            typeMenuIsOpened: false,
            mainMenuIsOpened: false, 
            subMenuIsOpened: false,
        });
    }
    resize= () => this.props.commonStore.changeScreenSize({width: window.innerWidth, height: window.innerHeight});
    
    _handleOnMouseOver = (e, name = '') => {
        if (this.state.selectedCategory !== 'work') {        
            setTimeout(() => {
                this.setState({selectedCategory: 'work'});
            }, 200);
        } else if (name === 'Work') {
            
            setTimeout(() => {
                this.setState({selectedSubCategory: name});
            }, 100);
        } else return;
    }

    _handleOnMouseLeave = (e, type = '') => {
        if (type === '') {
            setTimeout(() => {
                this.setState({selectedCategory: '', selectedSubCategory: ''});
            }, 200);
        } else {
            setTimeout(() => {
                this.setState({selectedSubCategory: ''});
            }, 100);
        }
    }

    _handleOnClickTypeMenu = () => {

    }

    _handleOnClickMainMenu = (e, name) => {
        if (name === 'Archives') {
            if (this.state.mainMenuIsOpened) {
                return true;
            }
            e.preventDefault();
            this.setState({mainMenuIsOpened: !this.state.mainMenuIsOpened});
        } else return true;
    }

    _handleOnClickSubMenu = (e, name) => {
        if (name === 'Work') {
            if (this.state.subMenuIsOpened) {
                return true;
            }
            e.preventDefault();
            this.setState({subMenuIsOpened: !this.state.subMenuIsOpened});
        } else return true;
    }

    _handleOnClickHamburger= () => {
        this.props.commonStore.toggleEnableScroll();
        this.setState({hamburgerOpened: !this.state.hamburgerOpened});
    }

    render() {
        let { screenSize: { width, height }} = this.props.commonStore;
        
        let mainCategories = this.props.categoryStore.registry || [];
        
        if (mainCategories.length <= 0) {
            return <div></div>
        } else
            return (
                <div className={cx('DesktopLayout')}>
                    {/* 모바일에선 터치화면이여서 커서가 불필요 */}
                    {
                        !isMobile &&
                        <Cursor />
                    }
                    {/* 모바일 햄버거 메뉴 */}
                        {
                            width <= md &&
                            <a 
                                className={cx('mobile-hamberger-menu', {'open': this.state.hamburgerOpened})} 
                                href="#" 
                                id="nav-icon2" 
                                onClick={this._handleOnClickHamburger}
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </a>
                        }
                    {/* 모바일 슬라이드 메뉴 컨테이너 (md 이하) */}
                    {
                        width <= md && 
                        <div 
                            className={cx(
                                "slide-navigation", 
                                { "visible": this.state.hamburgerOpened}, 
                                {"hidden": !this.state.hamburgerOpened}, 
                                {"animated": true}, 
                                {'slideInLeft': this.state.hamburgerOpened}, 
                                {'slideOutLeft': !this.state.hamburgerOpened})}
                            >
                            <nav>
                                <div className={cx('flex-box')}>
                                    {/* type category list */}
                                    <ul>
                                        <li className={cx('nav-item', 'nav-item--herakim')}>
                                            <Link to={`/about`}>HERA KIM</Link>
                                        </li>
                                        <li className={cx('nav-item', 'nav-item--projects')}>
                                            <Link to={`/projects`}>PROJECTS</Link>
                                        </li>
                                        <li 
                                            className={cx('nav-item', 'nav-item--archives')} 
                                            
                                        >
                                            <Link to={`/archives`} onClick={(e) => {this._handleOnClickMainMenu(e, 'Archives')}}>
                                                ARCHIVES
                                                {
                                                    this.state.mainMenuIsOpened &&
                                                    <span> ▶︎</span>
                                                }
                                            </Link>
                                            {/* main category list */}
                                            <ul 
                                                className={cx('sub-nav', {'active': this.state.mainMenuIsOpened})} 
                                            >
                                                {
                                                    mainCategories.map((category, i) => {
                                                        return <li 
                                                            key={`sub-nav-item-${i}`} 
                                                            className={cx('sub-nav-item', `sub-nav-item--${category.name}`)} 
                                                            >
                                                                <Link 
                                                                    to={`/archives/${category.name}`}
                                                                    className={cx({'isOpened': category.name === 'Work' && this.state.mainMenuIsOpened})} 
                                                                    onClick={(e) => this._handleOnClickSubMenu(e, category.name)} 
                                                                >
                                                                    {category.name}
                                                                    {
                                                                        this.state.subMenuIsOpened && category.name === 'Work' &&
                                                                        <span> ▶︎</span>
                                                                    }
                                                                </Link>
                                                            {/* sub category list */}
                                                            {
                                                                category.name === "Work" &&
                                                                <ul className={cx('work-sub', {'active': this.state.subMenuIsOpened})}>
                                                                    {category.subCategories.map((categoryWithSub, i) => {
                                                                        return <li key={`work-sub-item-${i}`} className={cx('work-sub-item')}>
                                                                            <Link to={`/archives/Work/${categoryWithSub.name}`}>- {categoryWithSub.name}</Link>
                                                                        </li>
                                                                    })}
                                                                </ul>
                                                            }
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </li>
                                        <div className={cx('sns')}>
                                            <a href={sns.instagramUrl} className={cx('instagram')} target="_blank" title="HERA Official Instaram">Instagram</a>
                                            <a href={sns.youtubeUrl} className={cx('youtube')} target="_blank" title="HERA Official Youtube">Youtube</a>
                                        </div>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    }
                    <header className={cx({'borderless': this.props.borderless})}>
                        <div className={cx('concept-title')}>
                            <Link to={'/'}><span>BLACK ENDING</span></Link>
                        </div>
                        <nav className={cx('home-nav', {'home-nav--mobile': width <= md})}>
                        {/* md 사이즈 이상 (테스크톱 크기) */}
                        {
                        width > md &&
                            <ul>
                                <li className={cx('nav-item', 'nav-item--herakim')}><Link to={`/about`}>HERA KIM</Link></li>
                                <li className={cx('nav-item', 'nav-item--projects')}><Link to={`/projects`}>PROJECTS</Link></li>
                                <li className={cx('nav-item', 'nav-item--archives')} onMouseOver={this._handleOnMouseOver} onMouseLeave={this._handleOnMouseLeave}>
                                    <Link to={`/archives`}>ARCHIVES</Link>
                                    <ul className={cx('sub-nav', {'active': this.state.selectedCategory === 'work'})} onMouseLeave={(e) => this._handleOnMouseLeave(e, 'sub')}>
                                        {
                                            mainCategories.map((category, i) => {
                                                return <li key={`sub-nav-item-${i}`} className={cx('sub-nav-item', `sub-nav-item--${category.name}`)} onMouseOver={(e) => this._handleOnMouseOver(e, category.name)} >
                                                    <Link to={`/archives/${category.name}`}>{category.name}</Link>
                                                    {
                                                        category.name === "Work" &&
                                                        <ul className={cx('work-sub', {'active': this.state.selectedSubCategory === 'Work'})}>
                                                            {category.subCategories.map((categoryWithSub, i) => {
                                                                return <li key={`work-sub-item-${i}`} className={cx('work-sub-item')}>
                                                                    <Link to={`/archives/Work/${categoryWithSub.name}`}>{categoryWithSub.name}</Link>
                                                                </li>
                                                            })}
                                                        </ul>
                                                    }
                                                </li>
                                            })
                                        }
                                    </ul>
                                </li>
                            </ul>
                        }
                        
                        
                        </nav>
                    </header>
                    <main className={cx({ 'fadeUp': this.props.fadeUp }, { 'fadeIn': this.props.fadeIn })}>
                        {this.props.children}
                    </main>
                </div>
            );
    }
}

export default DesktopLayout;



