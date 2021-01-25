import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import styles from './About.module.scss';
import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet';
import DesktopLayout from '../../layout/DesktopLayout';
import { md } from '../../constants/breakporints';

const cx = classNames.bind(styles);


@withRouter
@inject('commonStore')
@observer
class About extends Component {
    render() {
        let { screenSize: { width }} = this.props.commonStore;
        return (
            <div className={cx('About')}>
                <Helmet>
                    <title>HR ARCHIVE - HERA KIM</title>
                    <link rel="canonical" href={`http://hr-archive.com/about`} />
                    <meta http-equiv="Title" content={`HR ARCHIVE - HERA KIM`} />
                    <meta name="Keywords" content="fashion, brand, design, art, music" />
                    <meta name="Description" content="HR Archive Archive" />
                </Helmet>
                <DesktopLayout fadeIn>
                    <div className={cx('flex-box')}>
                        <div className={cx('owner-name')}>
                            {/* <span>HERA KIM</span> */}
                        </div>
                        {/* <div className={cx('slider-container')}></div> */}
                        {
                        width > md &&
                        <div className={cx('description')}>
                            <p>Republic Korea based Design & Styling with</p>
                            <p>Personally Concept Projects by Design director Hera Kim</p>
                        </div>
                        }
                        {
                        width <= md &&
                        <div className={cx('description')}>
                            <p>Republic Korea based</p>
                            <p>Design & Styling with</p>
                            <p>Personally Concept Projects </p>
                            <p>by Design director Hera Kim</p>
                        </div>
                        }
                    </div>
                </DesktopLayout>

            </div>
        );
    }
}

export default About;