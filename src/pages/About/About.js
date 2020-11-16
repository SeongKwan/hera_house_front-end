import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styles from './About.module.scss';
import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

@withRouter
class About extends Component {
    render() {
        return (
            <div className={cx('About')}>
                <Helmet>
                    <title>HR Archive - HERA.KIM</title>
                </Helmet>
                <h6>get to know about her...</h6>

            </div>
        );
    }
}

export default About;