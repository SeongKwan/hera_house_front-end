import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styles from './Projects.module.scss';
import classNames from 'classnames/bind';
import {
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DesktopLayout from '../../layout/DesktopLayout';

const cx = classNames.bind(styles);

@withRouter
class Projects extends Component {
    render() {
        const title = this.props.location.pathname.split('/')[2];
        let { path } = this.props.match;

        return (
            <div className={cx('Projects')}>
                <Helmet>
                    <title>HR ARCHIVE - PROJECTS</title>
                    <link rel="canonical" href={`http://hr-archive.com/projects`} />
                    <meta http-equiv="Title" content={`HR ARCHIVE - PROJECTS`} />
                    <meta name="Keywords" content="fashion, brand, design, art, music" />
                    <meta name="Description" content="HR Archive Archive" />
                </Helmet>
                <DesktopLayout fadeUp>
                    <div className={cx('flex-box')}>
                        <div className={cx('breadcrumb')}>
                            <span>PROJECTS</span>
                            {
                                title !== undefined ?
                                    <span>{` : ${title}`}</span>
                                    : <span></span>
                            }
                        </div>
                        <Switch>
                            <Route exact path={`${path}`}>
                                <div className={cx('grid-container')}>
                                    <ul className={cx('grid')}>
                                        <li className={cx('list-item')}><Link to={`/viewer?category=archives_work_objects&title=lovepoem&id=a9sed34`}><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                        <li className={cx('list-item')}><Link to={`/viewer?category=projects_fashion&title=blackending&id=a9sed34`}><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                        <li className={cx('list-item')}><Link to={`/viewer?category=projects&title=blackending&id=a9sed34`}><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                        <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                        <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                        <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                        <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                        <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                        <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                    </ul>
                                </div>
                            </Route>
                            <Route path={`${path}/:title/:id`}>
                                <div>project details page</div>
                            </Route>
                        </Switch>
                    </div>

                </DesktopLayout>
            </div>
        );
    }
}

export default Projects;