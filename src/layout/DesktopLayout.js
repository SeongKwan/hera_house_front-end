import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './DesktopLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

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
                            <li className={cx('nav-item', 'nav-item--projects')}>PROJECTS</li>
                            <li className={cx('nav-item', 'nav-item--archives')}>ARCHIVES</li>
                        </ul>
                    </nav>
                </header>
                {this.props.children}
            </div>
        );
    }
}

export default DesktopLayout;

