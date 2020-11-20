import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styles from './Viewer.module.scss';
import classNames from 'classnames/bind';
// import {
//     Switch,
//     Route,
//     Link,
// } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DesktopLayout from '../../layout/DesktopLayout';
import qs from 'qs';

const cx = classNames.bind(styles);

@withRouter
class Viewer extends Component {
    render() {
        let { path } = this.props.match;
        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true
        });
        const title = query.title;
        const mainCategory = query.category.split('_')[0];
        const subCategory = query.category.split('_')[1];
        const lastCategory = query.category.split('_')[2];
        console.log(query);
        // console.log(category);
        return (
            <div className={cx('Viewer')}>
                <Helmet>
                    <title>HR ARCHIVE - Title</title>
                    <link rel="canonical" href={`http://hr-archive.com/projects`} />
                    <meta http-equiv="Title" content={`HR ARCHIVE - Title`} />
                    <meta name="Keywords" content="fashion, brand, design, art, music" />
                    <meta name="Description" content="HR Archive Archive" />
                </Helmet>
                <DesktopLayout>
                    <div className={cx('flex-box')}>
                        <div className={cx('breadcrumb')}>
                            <span>{mainCategory}</span>
                            {
                                subCategory !== undefined ?
                                    <span>{` : ${subCategory}`}</span>
                                    : <span></span>
                            }
                            {
                                lastCategory !== undefined ?
                                    <span>{` : ${lastCategory}`}</span>
                                    : <span></span>
                            }
                            {
                                title !== undefined ?
                                    <span>{` : ${title}`}</span>
                                    : <span></span>
                            }
                        </div>
                    </div>
                    <article>
                        <div>Contents here</div>
                    </article>
                </DesktopLayout>
            </div>
        );
    }
}

export default Viewer;