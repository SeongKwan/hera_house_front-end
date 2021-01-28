import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styles from './Viewer.module.scss';
import classNames from 'classnames/bind';
import { inject, observer } from 'mobx-react';
import { Helmet } from 'react-helmet';
import DesktopLayout from '../../layout/DesktopLayout';
import qs from 'qs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Quill.scss';

const cx = classNames.bind(styles);

@withRouter
@inject('postStore', 'categoryStore', 'loginStore')
@observer
class Viewer extends Component {
    componentDidMount() {
        this._initialize();
    }

    componentWillUnmount() {
        this.props.postStore.clearThePost();
    }

    _initialize = () => {
        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true
        });

        this.props.postStore.loadPost(query.id);
    }
    render() {
        // let { path } = this.props.match;
        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true
        });
        const title = query.title;
        const type = query.category.split('_')[0];
        const category = query.category.split('_')[1];
        const subCategory = query.category.split('_')[2];
        
        console.log(category !== null);

        const { thePost } = this.props.postStore;
        // const { isLoggedIn } = this.props.loginStore;

        if (!!title === false) {
            return <div></div>
        }
        return (
            <div className={cx('Viewer')}>
                <Helmet>
                    <title>HR ARCHIVE - ${title}</title>
                    <link rel="canonical" href={`http://hr-archive.com/${type}`} />
                    <meta http-equiv="Title" content={`HR ARCHIVE - Title`} />
                    <meta name="Keywords" content="fashion, brand, design, art, music" />
                    <meta name="Description" content="HR Archive Archive" />
                </Helmet>
                <DesktopLayout>
                    <div className={cx('flex-box')}>
                        <div className={cx('breadcrumb')}>
                            <span>{type}</span>
                            {
                                category !== undefined && category !== null ?
                                    <span>{` : ${category}`}</span>
                                    : <></>
                            }
                            {
                                subCategory !== undefined && subCategory !== null ?
                                    <span>{` : ${subCategory}`}</span>
                                    : <></>
                            }
                            {
                                title !== undefined && title !== null ?
                                    <span>{` : ${title}`}</span>
                                    : <></>
                            }
                        </div>
                    </div>
                    <article>
                        <div className={'ql-readOnly-container'}>
                            <ReactQuill
                                className={cx('viewer-quill')}
                                value={thePost.content}
                                readOnly={true}
                                theme="bubble"
                            />
                        </div>
                    </article>
                </DesktopLayout>
            </div>
        );
    }
}

export default Viewer;