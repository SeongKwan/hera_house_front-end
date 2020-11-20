import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styles from './Archives.module.scss';
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
class Archives extends Component {
    render() {
        const subCategory = this.props.location.pathname.split('/')[2];
        const aCategory = this.props.location.pathname.split('/')[3];
        const title = this.props.location.pathname.split('/')[4];
        let { path } = this.props.match;
        return (
            <div className={cx('Archives')}>
                <Helmet>
                    <title>HR ARCHIVE - ARCHIVES</title>
                    <link rel="canonical" href={`http://hr-archive.com/archives`} />
                    <meta http-equiv="Title" content={`HR ARCHIVE - ARCHIVES`} />
                    <meta name="Keywords" content="fashion, brand, design, art, music" />
                    <meta name="Description" content="HR Archive Archive" />
                </Helmet>
                <DesktopLayout>
                    <div className={cx('flex-box')}>
                        <div className={cx('breadcrumb')}>
                            <span>ARCHIVES</span>
                            {
                                subCategory !== undefined ?
                                    <span>{` : ${subCategory}`}</span>
                                    : <span></span>
                            }
                            {
                                aCategory !== undefined ?
                                    <span>{` : ${aCategory}`}</span>
                                    : <span></span>
                            }
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
                                        <li className={cx('list-item')}><Link to={`/viewer`}><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                        <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                        <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                        <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                        <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                        <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                        <li className={cx('list-item')}><Link><div className={cx('image')}>img</div><div className={cx('list-item-title')}>black ending, 2020 12</div></Link></li>
                                    </ul>
                                </div>
                            </Route>
                            <Route exact path={`${path}/:subCategory`}>
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
                            </Route>
                            <Route exact path={`${path}/:subCategory/:title/:id`}>
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
                            </Route>
                            <Route exact path={`${path}/work/:aCategory`}>
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
                            </Route>
                            <Route path={`${path}/work/:aCategory/:title/:id`}>
                                <h5>archives details page</h5>
                            </Route>
                        </Switch>
                    </div>

                </DesktopLayout>
            </div>
        );
    }
}

export default Archives;