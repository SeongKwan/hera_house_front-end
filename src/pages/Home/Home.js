import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import categories from '../../constants/category';

const cx = classNames.bind(styles);
const cn = {
    list: 'list-main-category',
    item: 'list-item-main-category',
}

@withRouter
class Home extends Component {
    render() {
        return (
            <div className={cx('Home')}>
                <main className={cx('main')}>
                    <div className={cx('wrapper-logo')}>Hera House</div>
                    <ul className={cx(cn.list)}>
                        {categories.map(category => {
                            const { path, name } = category;
                            return <Link key={name} to={`/archive${path}`} className={cx('link-nav-item')}><li className={cx(cn.item)}>{name}</li></Link>
                        })}
                    </ul>
                </main>
            </div>
        );
    }
}

export default Home;