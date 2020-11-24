import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { inject, observer } from 'mobx-react';
import styles from './DesktopLayout.module.scss';
import classNames from 'classnames/bind';
import Cursor from '../components/Cursor/Cursor';

const cx = classNames.bind(styles);

@withRouter
@inject('categoryStore', 'loginStore')
@observer
class DesktopLayout extends Component {
    state = {selectedCategory: '', selectedSubCategory: ''}
    componentDidMount() {
        this.props.categoryStore.loadCategories();
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
    render() {
        let mainCategories = this.props.categoryStore.registry || [];
        
        if (mainCategories.length <= 0) {
            return <div></div>
        } else
            return (
                <div className={cx('DesktopLayout')}>
                    <Cursor />
                    <header>
                        <div className={cx('concept-title')}>
                            <Link to={'/'}><span>BLACK ENDING</span></Link>
                        </div>
                        <nav className={cx('home-nav')}>
                            <ul>
                                <li id="cursor-test" className={cx('nav-item', 'nav-item--herakim')}><Link to={`/about`}>HERA KIM</Link></li>
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



