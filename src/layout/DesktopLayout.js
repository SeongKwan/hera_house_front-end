import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './DesktopLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const _subCategory = ['Work', 'Clothing', 'Daily', 'Photo', 'Share', 'Sounds'];
const _workSubCategory = ['brand', 'fashion', 'art', 'graphic', 'object', 'food styling'];
class DesktopLayout extends Component {
    render() {
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

                            </li>
                            {/* <ul className={cx('sub-nav')}>
                                {
                                    _subCategory.map((category, i) => {
                                        return <li key={`sub-nav-item-${i}`} className={cx('sub-nav-item')}>{category}</li>
                                    })
                                }
                            </ul> */}
                        </ul>
                    </nav>
                </header>
                {this.props.children}
            </div>
        );
    }
}

export default DesktopLayout;

