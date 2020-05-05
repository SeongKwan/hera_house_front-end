import React, { Component } from 'react';
import styles from './LayoutAdmin.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class LayoutAdmin extends Component {
    render() {
        return (
            <article className={cx('LayoutAdmin')}>
                <section className={cx('wrapper-section-title')}>
                    <h3 className={cx('section-title')}>{this.props.sectionTitle}</h3>
                </section>
                <section className={cx('container')}>
                    {this.props.children}
                </section>
            </article>
        );
    }
}

export default LayoutAdmin;