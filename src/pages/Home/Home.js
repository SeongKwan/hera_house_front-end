import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { inject, observer } from 'mobx-react';
import { IoIosSettings } from "react-icons/io";
import { Helmet } from "react-helmet";
import DesktopLayout from '../../layout/DesktopLayout';

const cx = classNames.bind(styles);

@withRouter
@inject('categoryStore', 'loginStore')
@observer
class Home extends Component {
    componentDidMount() {
        this.props.categoryStore.loadCategories();
    }
    render() {
        let mainCategories = this.props.categoryStore.registry;
        if (mainCategories.length > 0) {

            return (
                <div className={cx('Home')}>
                    <Helmet>
                        <title>HR ARCHIVE - HOME</title>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                        <link rel="canonical" href="http://hr-archive.com" />
                        {/* 검색엔진 단어 */}
                        <meta name="Keywords" content="fashion, brand, design, art, music" />
                        {/* <meta name="Description" content="브랜드 디자이너 에일의 다양한 분야에 관한 그 만의 글이 모여있는 곳" /> */}
                        {/* 사이트 제목 */}
                        <meta http-equiv="Title" content="Hera's Archive" />
                        {/* 사이트 주제 */}
                        <meta http-equiv="Subject" content="영감을 얻어가기 좋은 곳" />
                        {/* 자작사 */}
                        <meta http-equiv="Publisher" content="HhEeRrAa" />
                        {/* 메일 주소 */}
                        {/* <meta http-equiv="Reply-To" content="we@naver.com" /> 
                        <meta http-equiv="Email" content="naver@naver.com" /> */}
                    </Helmet>
                    <DesktopLayout mainCategories={mainCategories}>
                        <div className={cx('identity')}>
                            <p>Republic Korea based</p>
                            <p>Design & Styling with</p>
                            <p>Personally Concept Projects by</p>
                            <p>Design director Hera Kim</p>

                            <span className={cx('site-name')}>HR ARCHIVE</span>
                        </div>
                        <div className={cx('concept-point')}>
                            <p>When all colors</p>
                            <p>are combined,</p>
                            <p>the end is clearly BLACK</p>
                        </div>
                        <div className={cx('sns')}>
                            <div className={cx('youtube')}>Youtube</div>
                            <div className={cx('instagram')}>Instagram</div>
                        </div>
                    </DesktopLayout>
                </div>
            );
        } else {
            return <div className={cx('Home')}></div>
        }
    }
}

export default Home;



{/* <main className={cx('main')}>
                    <div className={cx('wrapper-brand-logo')}><span>HR ARCHIVE</span></div>
                    <nav className={cx(cn.list)}>
                        {
                            categories.length > 0 ? categories.map(category => {
                                const { name } = category;
                                return <Link key={name} to={`/archive/${name}`} className={cx('link-nav-item')}><li className={cx(cn.item)}>
                                    <span>{name}</span>
                                </li>
                                </Link>
                            })
                                : <div></div>
                        }
                        <Link to={`/about`} className={cx('link-nav-item')}><li className={cx(cn.item)}>
                            <span>HERA KIM</span>
                        </li>
                        </Link>
                        <Link to={`/projects`} className={cx('link-nav-item')}><li className={cx(cn.item)}>
                            <span>PROJECTS</span>
                        </li>
                        </Link>
                        <Link to={`/archive`} className={cx('link-nav-item', 'link-nav-item--archive')}>
                            <li className={cx(cn.item)}>
                                <span>ARCHIVE</span>
                                <ul className={cx('archive-sub-category')}>
                                    {
                                        categories.length > 0 ? categories.map((category, idx) => {
                                            const { name } = category;
                                            console.log(name)
                                            return <div key={name} to={`/archive/${name}`} className={cx('')}>
                                                <li className={cx('')}>
                                                    <span>{name}</span>
                                                    {
                                                        name === 'Work' &&
                                                        <ul className={cx('work-sub-category')}>
                                                            {
                                                                _workSubCategory.map((category, i) => {
                                                                    return <div key={category} to={`/archive/work/${category}`} className={cx('')}><li className={cx('')}>
                                                                        <span>{category}</span>
                                                                    </li>
                                                                    </div>
                                                                })
                                                            }
                                                        </ul>

                                                    }
                                                </li>
                                            </div>
                                        })
                                            : <div></div>
                                    }
                                </ul>
                            </li>
                        </Link>
                    </nav>
                </main>
                {
                    isLoggedIn &&
                    <div className={cx('floating-container')}>
                        <button onClick={() => this.props.history.push('/admin')}><IoIosSettings className={cx('icon')} /></button>
                    </div>
                } */}
