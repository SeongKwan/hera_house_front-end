import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import styles from './Archives.module.scss';
import classNames from 'classnames/bind';
import {
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DesktopLayout from '../../layout/DesktopLayout';
import staticUrl from '../../constants/staticUrl';

const cx = classNames.bind(styles);

@withRouter
@inject('postStore', 'categoryStore')
@observer
class Archives extends Component {
    componentDidMount() {
        this._initialize();
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.location.pathname.split('/')[2] !== this.props.location.pathname.split('/')[2])
            || (prevProps.location.pathname.split('/')[3] !== this.props.location.pathname.split('/')[3])) {
            this._initialize();
        }
    }

    componentWillUnmount() {
        this.props.postStore.clearRegistry();
    }

    _initialize = () => {
        const type = this.props.location.pathname.split('/')[1];
        const category = this.props.location.pathname.split('/')[2];
        const subCategory = this.props.location.pathname.split('/')[3];
        this.props.postStore.loadFilteredPosts({ type, category, subCategory });
    }

    render() {
        const subCategory = this.props.location.pathname.split('/')[2];
        const aCategory = this.props.location.pathname.split('/')[3];
        const title = this.props.location.pathname.split('/')[4];
        let posts = this.props.postStore.registry;
        return (
            <div className={cx('Archives')}>
                <Helmet>
                    <title>HR ARCHIVE - ARCHIVES</title>
                    <link rel="canonical" href={`http://hr-archive.com/archives`} />
                    <meta http-equiv="Title" content={`HR ARCHIVE - ARCHIVES`} />
                    <meta name="Keywords" content="fashion, brand, design, art, music" />
                    <meta name="Description" content="HR Archive Archive" />
                </Helmet>
                <DesktopLayout fadeIn>
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
                        <div className={cx('grid-container')}>
                            <ul className={cx('grid')}>
                                {
                                    posts.length > 0 &&
                                    posts.map((post, i) => {
                                        return <li key={`projects-card-${post._id}}`} className={cx('list-item')}>
                                            <Link to={`/viewer?category=${post.type}_${post.category}_${post.subCategory}&title=${post.title}&id=${post._id}`}>
                                                <div className={cx('image')}>
                                                    <img src={`${staticUrl}/${post.thumbnail}`} alt="post thumbnail" />
                                                </div>
                                                <div className={cx('list-item-title')}>{post.title}</div>
                                            </Link>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                        <Switch>
                            {/* <Route exact path={`${path}`}>
                            </Route> */}
                            {/* <Route exact path={`${path}/:subCategory`}>
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
                            </Route> */}
                        </Switch>
                    </div>

                </DesktopLayout>
            </div>
        );
    }
}

export default Archives;