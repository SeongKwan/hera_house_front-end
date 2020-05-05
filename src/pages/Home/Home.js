import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { inject, observer } from 'mobx-react';
import { IoIosSettings } from "react-icons/io";

const cx = classNames.bind(styles);
const cn = {
    list: 'list-main-category',
    item: 'list-item-main-category',
}

@withRouter
@inject('categoryStore', 'loginStore')
@observer
class Home extends Component {
    componentDidMount() {
        this.props.categoryStore.loadCategories();
    }
    render() {
        const categories = this.props.categoryStore.registry;
        const { isLoggedIn } = this.props.loginStore;

        return (
            <div className={cx('Home')}>
                {
                    isLoggedIn &&
                    <div className={cx('floating-container')}>
                        <button onClick={()=>this.props.history.push('/admin')}><IoIosSettings className={cx('icon')} /></button>
                    </div>
                }
                <main className={cx('main')}>
                    <div className={cx('wrapper-brand-logo')}>Hera House!!</div>
                    <nav className={cx(cn.list)}>
                        {categories.map(category => {
                            const { name } = category;
                            return <Link key={name} to={`/archive/${name}`} className={cx('link-nav-item')}><li className={cx(cn.item)}>{name}</li></Link>
                        })}
                    </nav>
                </main>
            </div>
        );
    }
}

export default Home;