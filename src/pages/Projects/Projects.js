import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import styles from './Projects.module.scss';
import classNames from 'classnames/bind';
import {
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DesktopLayout from '../../layout/DesktopLayout';
import staticUrl from '../../constants/staticUrl';
import Loader from '../../components/Loader/Loader';

const cx = classNames.bind(styles);

@withRouter
@inject('postStore', 'categoryStore')
@observer
class Projects extends Component {
    componentDidMount() {
        this._initialize();
    }

    componentWillUnmount() {
        this.props.postStore.clearRegistry();
    }

    _initialize = () => {
        const type = this.props.location.pathname.split('/')[1]
        this.props.postStore.loadFilteredPosts({ type });
    }

    render() {
        const title = this.props.location.pathname.split('/')[2];
        const { isLoading } = this.props.postStore;
        let { path } = this.props.match;
        let posts = this.props.postStore.registry;


        return (
            <div className={cx('Projects')}>
                <Helmet>
                    <title>HR ARCHIVE - PROJECTS</title>
                    <link rel="canonical" href={`http://hr-archive.com/projects`} />
                    <meta http-equiv="Title" content={`HR ARCHIVE - PROJECTS`} />
                    <meta name="Keywords" content="fashion, brand, design, art, music" />
                    <meta name="Description" content="HR Archive Archive" />
                </Helmet>
                <DesktopLayout fadeIn>
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
                                        {
                                            posts.length > 0 ?
                                            posts.map((post, i) => {
                                                return <li key={`projects-card-${post._id}}`} className={cx('list-item')}>
                                                    <Link to={`/viewer?category=${post.type}&title=${post.title}&id=${post._id}`}>
                                                        <div className={cx('image')}>
                                                            <img src={`${staticUrl}/${post.thumbnail}`} alt="post thumbnail" />
                                                        </div>
                                                        <div className={cx('list-item-title')}>{post.title}</div>
                                                    </Link>
                                                </li>
                                            })
                                            : posts.length === 0 && !isLoading ? <div className={cx('no-results')}>Nothings in here, yet.</div> : <div className={cx('loader-container')}><Loader /></div>
                                        }
                                    </ul>
                                </div>
                            </Route>
                        </Switch>
                    </div>

                </DesktopLayout>
            </div>
        );
    }
}

export default Projects;