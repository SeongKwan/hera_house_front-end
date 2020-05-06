import React, { Component } from 'react';
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import { withRouter } from "react-router";
import { inject, observer } from 'mobx-react';
import styles from './Archive.module.scss';
import classNames from 'classnames/bind';
import PostList from '../../components/PostList/PostList';
import Post from '../../components/Post/Post';
import { IoIosArrowUp, IoIosSettings, IoIosMenu } from "react-icons/io";

const cx = classNames.bind(styles);
const cn = {
    list: 'list-main-category',
    item: 'list-item-main-category',
}

@withRouter
@inject('categoryStore', 'loginStore')
@observer
class Archive extends Component {
    state = { isSeen: false, isVisibleCategory: false , active: false}

    componentDidMount() {
        this.props.categoryStore.loadCategories();
        window.addEventListener("scroll", this._showTopScrollButton);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this._showTopScrollButton);
    }

    _showTopScrollButton = () => {
        let { scrollY } = window,
            { scrollHeight } = this.mainContainer;
        let touchDown = ((scrollY / scrollHeight) > 0.1) || scrollY > 100;

        if (touchDown && !this.state.isSeen) {
            this.setState({isSeen: true});
        } else if (!touchDown && this.state.isSeen) {
            this.setState({isSeen: false});
        }
    }

    _onClickBrandLogo = () => {
        this.props.history.push('/');
    }

    _handleClickOnDropdown = () => {
        console.log('clcik dorpdown')
        this.setState({ isVisibleCategory: !this.state.isVisibleCategory});
    }

    _onClickTopScrollButton = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    toggleDropdown() {
        this.setState({
          active: !this.state.active
        });
      }
      
      handleClick(i) {
        this.setState({
          selected: i
        });
      }

    render() {
        const categories = this.props.categoryStore.registry;
        const currentCategory = this.props.location.pathname.split('/')[2];
        const { isLoggedIn } = this.props.loginStore;
        let { path } = this.props.match;
        let isDetailPage = window.location.pathname.split('/').length > 3 ? true : false;

        return (
            <div className={cx('Archive')}>
            {
                isLoggedIn &&
                <div className={cx('floating-container')}>
                    <button onClick={()=>this.props.history.push('/admin')}><IoIosSettings className={cx('icon')} /></button>
                </div>
            }
                <header className={cx('header')}>
                    <div className={cx('wrapper-brand-logo')} data-device="desktop" onClick={this._onClickBrandLogo}><span>Hera House</span></div>
                    <div className={cx('wrapper-brand-logo')} data-device="mobile">
                        <span onClick={this._onClickBrandLogo}>HH</span>
                    </div>

                    <div className={cx('dropdown')}>
                        <div
                            onClick={() => this.toggleDropdown()}
                            className={cx('dropdown__toggle', 'dropdown__list-item' )}
                        >
                            <span>{currentCategory}</span><IoIosMenu className={cx('icon')} />
                        </div>
                    </div>

                    {
                        isLoggedIn &&
                        <div className={cx('button-admin')} onClick={()=>this.props.history.push('/admin')}>
                        <div className={cx('wrapper-button-admin')}><IoIosSettings className={cx('icon')} /></div></div>
                    }
                    
                </header>

                
                <div className={cx('container')}>
                    <aside className={cx('aside', {listPage: !isDetailPage})}>
                        <nav className={cx(cn.list)}>
                            {categories.map(category => {
                                const { name } = category;
                                return <Link key={name} to={`/archive/${name}`} className={cx('link-nav-item')}><li className={cx(cn.item, {selected: currentCategory === name})}>{name}</li></Link>
                            })}
                        </nav>
                    </aside>
                    <main className={cx('main')} ref={ref => this.mainContainer = ref}>
                        <Switch>
                            <Route exact path={`${path}/:category`}>
                                <PostList />
                            </Route>
                            <Route path={`${path}/:category/:postId`}>
                                <Post />
                            </Route>
                        </Switch>
                        {
                            this.state.isSeen && 
                            <div className={cx('wrapper-button-top-scroll')}>
                                <div className={cx('wrapper-icon')} onClick={this._onClickTopScrollButton}>
                                    <IoIosArrowUp className={cx('icon')} />
                                </div>
                            </div>
                        }
                    </main>
                </div>

                {/* <ul className={cx('dropdown-list', {isOpened: this.state.active}, {notOpened: !this.state.active})}>
                    {categories.map((category, i) =>{ 
                        return <li 
                            onClick={evt => console.log('list clicked')} 
                            key={i} 
                            className={cx('dropdown_list-item')}
                        >
                            {category.name}
                        </li>
                        })
                    }
                </ul> */}
                {/* <ul className={cx('dropdown__list', {"dropdown__list--active": this.state.active})}>
                    {categories.map((category, i) =>{ 
                        return <li 
                            onClick={evt => console.log('list clicked')} 
                            key={i} 
                            className={cx('dropdown_list-item')}
                        >
                            {category.name}
                        </li>
                        })
                    }
                </ul> */}
            </div>
        );
    }
}

export default Archive;