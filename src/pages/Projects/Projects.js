import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styles from './Projects.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DesktopLayout from '../../layout/DesktopLayout';

const cx = classNames.bind(styles);

@withRouter
class Projects extends Component {
    render() {
        return (
            <div className={cx('Projects')}>
                <Helmet>
                    <title>HR Archive - Projects</title>
                    <link rel="canonical" href={`http://hr-archive.com/projects`} />
                    <meta http-equiv="Title" content={`HR Archive - Projects`} />
                    <meta name="Keywords" content="fashion, brand, design, art, music" />
                    <meta name="Description" content="HR Archive Archive" />
                </Helmet>
                <DesktopLayout>
                    <div className={cx('flex-box')}>
                        <div className={cx('breadcrumb')}>
                            <span>PROJECTS</span>
                        </div>
                        <div className={cx('grid-container')}>
                            <ul className={cx('grid')}>
                                <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                            </ul>
                        </div>
                    </div>
                </DesktopLayout>

            </div>
        );
    }
}

export default Projects;