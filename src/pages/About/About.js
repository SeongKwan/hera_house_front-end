import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styles from './About.module.scss';
import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet';
import DesktopLayout from '../../layout/DesktopLayout';
const cx = classNames.bind(styles);

@withRouter
class About extends Component {
    render() {
        return (
            <div className={cx('About')}>
                <Helmet>
                    <title>HR Archive - HERA.KIM</title>
                </Helmet>
                <DesktopLayout>
                    <div className={cx('flex-box')}>
                        <div className={cx('owner-name')}>
                            <span>HERA KIM</span>
                        </div>
                        <div className={cx('slider-container')}></div>
                        <div className={cx('description')}>
                            <p>Republic Korea based Design & Styling with</p>
                            <p>Personally Concept Projects by Design director Hera Kim</p>
                        </div>
                    </div>
                </DesktopLayout>

            </div>
        );
    }
}

export default About;