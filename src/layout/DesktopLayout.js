import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { inject, observer } from 'mobx-react';
import styles from './DesktopLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

@withRouter
@inject('categoryStore', 'loginStore')
@observer
class DesktopLayout extends Component {
    componentDidMount() {
        this.props.categoryStore.loadCategories();
    }
    render() {
        let mainCategories = this.props.categoryStore.registry || [];
        if (mainCategories.length <= 0) {
            return <div></div>
        } else
            return (
                <div className={cx('DesktopLayout')}>
                    <header>
                        <div className={cx('concept-title')}>
                            <Link to={'/'}><span>BLACK ENDING</span></Link>
                        </div>
                        <nav className={cx('home-nav')}>
                            <ul>
                                <li className={cx('nav-item', 'nav-item--herakim')}><Link to={`/about`}>HERA KIM</Link></li>
                                <li className={cx('nav-item', 'nav-item--projects')}><Link to={`/projects`}>PROJECTS</Link></li>
                                <li className={cx('nav-item', 'nav-item--archives')}>
                                    <Link to={`/archives`}>ARCHIVES</Link>
                                    <ul className={cx('sub-nav')}>
                                        {
                                            mainCategories.map((category, i) => {
                                                return <li key={`sub-nav-item-${i}`} className={cx('sub-nav-item', `sub-nav-item--${category.name}`)}>
                                                    <Link to={`/archives/${category.name}`}>{category.name}</Link>
                                                    {
                                                        category.name === "Work" &&
                                                        <ul className={cx('work-sub')}>
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

