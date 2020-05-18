import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { inject, observer } from 'mobx-react';
import styles from './NavBar.module.scss';
import classNames from 'classnames/bind';
// import { IoLogoInstagram } from 'react-icons/io';
// import { TiSocialPinterest } from 'react-icons/ti';
// import { AiOutlineYoutube } from 'react-icons/ai';
import sns from '../../constants/sns';

const cx = classNames.bind(styles);
const cn = {
    list: 'list-main-category',
    item: 'list-item-main-category',
}

@withRouter
@inject('categoryStore', 'loginStore', 'commonStore')
@observer
class NavBar extends Component {
    state = { activeLink: '',  };
    componentDidMount() {
        const currentCategory = this.props.location.pathname.split('/')[2];
        this.setState({ activeLink: currentCategory });
        this._checkRefsAre();
        window.addEventListener('resize', this._checkRefsAre);
    }

    componentDidUpdate() {
        this._checkRefsAre();
    }

    _checkRefsAre = () => {
        const name = this.props.location.pathname.split('/')[2];
        if (!!this[`category-${name}`]) {
            this.activeMarker.style.display = 'block';
            const offset = this.getItemOffset(this[`category-${name}`]);
            this.moveMarker(offset);
        }
    }

    getItemOffset = (item) => {
        const {
            offsetLeft,
            offsetWidth
        } = item.children[0];
        
        return {offsetLeft, offsetWidth};
    };

    moveMarker = ({offsetLeft, offsetWidth}) => {
        const marker = this.activeMarker;
        marker.style.left = `${offsetLeft}px`;
        marker.style.width = `${offsetWidth}px`;
    };

    toggleActive = ({e = null, name}) => {
        this.setState({ activeLink: name });
        
        // Add class to active link
        const activeItem = this[`category-${name}`];
        const offset = this.getItemOffset(activeItem);
        this.moveMarker(offset);
    };

    _handleOnClickSns = (type) => {
        return window.open(sns[type], '_blank');
    }

    render() {
        const categories = this.props.categoryStore.registry;
        const currentCategory = this.props.location.pathname.split('/')[2];
        // let isDetailPage = window.location.pathname.split('/').length > 3 ? true : false;
        if (categories.length <= 0) {
            return <div className={cx('NavBar')}>
            <nav ref={ref => this.nav = ref} className={cx(cn.list)}>
                <li style={{height: '40px', width: 100}}></li>
            </nav>
        </div>
        }
        
        return (
            <div className={cx('NavBar')}>
                <nav ref={ref => this.nav = ref} className={cx(cn.list)}>
                    {categories.map((category, index) => {
                        const { name } = category;
                        return <Link 
                            ref={ref => {this[`category-${name}`] = ref;}} 
                            key={name} to={`/archive/${name}`} 
                            className={cx('link-nav-item', {'is-active': name === this.state.activeLink})}
                            onClick={(e) => this.toggleActive({e, name})}
                            >
                            <li className={cx(cn.item, {selected: currentCategory === name})}>{name}</li>
                        </Link>
                    })}
                </nav>
                <i ref={ref => this.activeMarker = ref} className={cx('active-marker')}></i>
                {/* <div className={cx('container-sns')}>
                    <IoLogoInstagram className={cx('icon')} onClick={() => this._handleOnClickSns('instagram')} />
                    <TiSocialPinterest className={cx('icon')} onClick={() => this._handleOnClickSns('pinterest')} />
                    <AiOutlineYoutube className={cx('icon')} onClick={() => this._handleOnClickSns('youtube')} />
                </div> */}
            </div>
        )
    }
}

export default NavBar;