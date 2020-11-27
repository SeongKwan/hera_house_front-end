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
    state = {selectedCategory: '', selectedSubCategory: '', hamburgerOpened: false, typeMenuIsOpened: false, MainMenuIsOpened: false,}
    componentDidMount() {
        this.props.categoryStore.loadCategories();
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    resize() {
        this.props.commonStore.changeScreenSize({width: window.innerWidth, height: window.innerHeight});
        
    }
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

    _handleOnClickHamburger= () => {
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
                            <a className={cx('mobile-hamberger-menu', {'open': this.state.hamburgerOpened})} href="#" id="nav-icon2" onClick={this._handleOnClickHamburger}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </a>
                        }
                    {/* 모바일 슬라이드 메뉴 컨테이너 */}
                    {
                        width <= md && 
                        <div className={cx("slide-navigation", { "visible": this.state.hamburgerOpened}, {"hidden": !this.state.hamburgerOpened}, {"animated": true}, {'slideInLeft': this.state.hamburgerOpened}, {'slideOutLeft': !this.state.hamburgerOpened})}>
                            <nav>
                                
                                <div className={cx('flex-box')}>
                                    <ul>
                                        <li className={cx('nav-item', 'nav-item--herakim')}><Link to={`/about`}>HERA KIM</Link></li>
                                        <li className={cx('nav-item', 'nav-item--projects')}><Link to={`/projects`}>PROJECTS</Link></li>
                                        <li className={cx('nav-item', 'nav-item--archives')} onClick={this._handleOnMouseOver}>
                                            <Link to={`/archives`}>ARCHIVES</Link>
                                            <ul className={cx('sub-nav', {'active': this.state.selectedCategory === 'work'})} onMouseLeave={(e) => this._handleOnMouseLeave(e, 'sub')}>
                                                {
                                                    mainCategories.map((category, i) => {
                                                        return <li key={`sub-nav-item-${i}`} className={cx('sub-nav-item', `sub-nav-item--${category.name}`)} onClick={(e) => this._handleOnMouseOver(e, category.name)} >
                                                            <Link to={`/archives/${category.name}`}>{category.name}</Link>
                                                            {
                                                                category.name === "Work" &&
                                                                <ul className={cx('work-sub', {'active': this.state.selectedSubCategory === 'Work'})}>
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



