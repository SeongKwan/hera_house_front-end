import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styles from './Projects.module.scss';
import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

@withRouter
class Projects extends Component {
    render() {
        return (
            <div className={cx('Projects')}>
                <Helmet>
                    <title>HR Archive - HERA.KIM</title>
                </Helmet>
                <h6>you can see all projects in here</h6>

            </div>
        );
    }
}

export default Projects;