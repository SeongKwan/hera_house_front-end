import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { inject, observer } from 'mobx-react';
import { IoIosSettings } from "react-icons/io";
import { Helmet } from "react-helmet";
import LeftBG from '../../styles/img/home_left_background.png'
import RightBG from '../../styles/img/home_right_background.png'

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
                <Helmet>
                    <title>Hera House - Home</title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <link rel="canonical" href="http://hera-house.site" />
                    {/* 검색엔진 단어 */}
                    <meta name="Keywords" content="fashion, brand, design, art, music" />
                    <meta name="Description" content="브랜드 디자이너 에일의 다양한 분야에 관한 그 만의 글이 모여있는 곳" />
                    {/* 사이트 제목 */}
                    <meta http-equiv="Title" content="Hera's House" />
                    {/* 사이트 주제 */}
                    <meta http-equiv="Subject" content="영감을 얻어가기 좋은 곳" />
                    {/* 자작사 */}
                    <meta http-equiv="Publisher" content="HhEeRrAa" />
                    {/* 메일 주소 */}
                    {/* <meta http-equiv="Reply-To" content="we@naver.com" /> 
                    <meta http-equiv="Email" content="naver@naver.com" /> */}
                </Helmet>
                <div className={cx('container', 'container--left')}>
                    <img src={LeftBG} alt="left side background" />
                </div>
                <div className={cx('container', 'container--center')}>
                    <main className={cx('main')}>
                        <div className={cx('wrapper-brand-logo')}>Hera House</div>
                        <nav className={cx(cn.list)}>
                            {categories.map(category => {
                                const { name } = category;
                                return <Link key={name} to={`/archive/${name}`} className={cx('link-nav-item')}><li className={cx(cn.item)}>{name}</li></Link>
                            })}
                        </nav>
                    </main>
                </div>
                <div className={cx('container', 'container--right')}>
                    <img src={RightBG} alt="right side background" />
                </div>
                {
                    isLoggedIn &&
                    <div className={cx('floating-container')}>
                        <button onClick={()=>this.props.history.push('/admin')}><IoIosSettings className={cx('icon')} /></button>
                    </div>
                }
                
            </div>
        );
    }
}

export default Home;