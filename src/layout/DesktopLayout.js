import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import styles from './DesktopLayout.module.scss';
import './DesktopLayout.css';
import classNames from 'classnames/bind';
import Cursor from '../components/Cursor/Cursor';
import { isMobile } from 'react-device-detect';
import { md } from '../constants/breakporints';
import sns from '../constants/sns';

const cx = classNames.bind(styles);

@withRouter
@inject('categoryStore', 'loginStore', 'commonStore')
@observer
class DesktopLayout extends Component {
    state = {
        selectedCategory: '',
        selectedSubCategory: '',
        hamburgerOpened: false,
        typeMenuIsOpened: false,
        mainMenuIsOpened: false,
        subMenuIsOpened: false,
    };

    componentDidMount() {
        this.props.categoryStore.loadCategories();
        window.addEventListener('resize', this.resize.bind(this));
        // We listen to the resize event
        window.addEventListener('load', () => {
            this._getVhFromWindow();
        });
        window.addEventListener('resize', () => {
            this._getVhFromWindow();
        });
        this.resize();
    }

    _getVhFromWindow = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    componentWillUnmount() {
        this.props.commonStore.clearEnableScroll();
        this._clearState();
    }

    resize = () =>
        this.props.commonStore.changeScreenSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });

    _clearState = () => {
        this.setState({
            selectedCategory: '',
            selectedSubCategory: '',
            hamburgerOpened: false,
            typeMenuIsOpened: false,
            mainMenuIsOpened: false,
            subMenuIsOpened: false,
        });
    };

    _handleOnMouseOver = (e, name = '') => {
        if (this.state.selectedCategory !== 'work') {
            setTimeout(() => {
                this.setState({ selectedCategory: 'work' });
            }, 200);
        } else if (name === 'Work') {
            setTimeout(() => {
                this.setState({ selectedSubCategory: name });
            }, 100);
        } else return;
    };

    _handleOnMouseLeave = (e, type = '') => {
        if (type === '') {
            setTimeout(() => {
                this.setState({
                    selectedCategory: '',
                    selectedSubCategory: '',
                });
            }, 200);
        } else {
            setTimeout(() => {
                this.setState({ selectedSubCategory: '' });
            }, 100);
        }
    };

    _handleOnClickTypeMenu = () => {};

    _handleOnClickMainMenu = (e, name) => {
        this._getVhFromWindow();
        if (name === 'Archives') {
            if (this.state.mainMenuIsOpened) {
                // this._clearState();
                return false;
            }
            e.preventDefault();
            this.setState({ mainMenuIsOpened: !this.state.mainMenuIsOpened });
        } else this._clearState();
        e.preventDefault();
        return false;
    };

    _handleOnClickSubMenu = (e, name) => {
        this._getVhFromWindow();
        if (name === 'Work') {
            if (this.state.subMenuIsOpened) {
                this._clearState();
                return true;
            }
            e.preventDefault();
            this.setState({ subMenuIsOpened: !this.state.subMenuIsOpened });
        } else this._clearState();
        return true;
    };

    _handleOnClickHamburger = () => {
        this.props.commonStore.toggleEnableScroll();
        this.setState({ hamburgerOpened: !this.state.hamburgerOpened });
    };

    render() {
        const atHomeRoute = this.props.history.location.pathname === '/';
        let {
            screenSize: { width },
        } = this.props.commonStore;

        let mainCategories = this.props.categoryStore.registry || [];

        if (mainCategories.length <= 0) {
            return <div></div>;
        } else
            return (
                <div
                    className={cx('DesktopLayout', {
                        disableScroll: !this.props.commonStore.enableScroll,
                    })}
                >
                    {/* 모바일에선 터치화면이여서 커서가 불필요 */}
                    {!isMobile && <Cursor />}
                    {/* 모바일 햄버거 메뉴 */}
                    {width <= md && (
                        <a
                            className={cx('mobile-hamberger-menu', {
                                open: this.state.hamburgerOpened,
                            })}
                            href="#"
                            id="nav-icon2"
                            onClick={this._handleOnClickHamburger}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                    )}
                    {/* 모바일 슬라이드 메뉴 컨테이너 (md 이하) */}
                    {width <= md && (
                        <div
                            className={cx(
                                'slide-navigation',
                                { visible: this.state.hamburgerOpened },
                                { hidden: !this.state.hamburgerOpened },
                                { animated: true },
                                { slideInLeft: this.state.hamburgerOpened },
                                { slideOutLeft: !this.state.hamburgerOpened },
                            )}
                        >
                            <nav>
                                <div className={cx('flex-box')}>
                                    {/* type category list */}
                                    <ul>
                                        <div>
                                            <li
                                                className={cx(
                                                    'nav-item',
                                                    'nav-item--herakim',
                                                )}
                                            >
                                                <Link to={`/about`}>
                                                    HERA KIM
                                                </Link>
                                            </li>
                                            <li
                                                className={cx(
                                                    'nav-item',
                                                    'nav-item--projects',
                                                )}
                                            >
                                                <Link to={`/projects`}>
                                                    PROJECTS
                                                </Link>
                                            </li>
                                            <li
                                                className={cx(
                                                    'nav-item',
                                                    'nav-item--archives',
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'mobile-link-archive',
                                                    )}
                                                    onClick={(e) => {
                                                        this._handleOnClickMainMenu(
                                                            e,
                                                            'Archives',
                                                        );
                                                    }}
                                                >
                                                    ARCHIVES
                                                </div>
                                                {/* main category list */}
                                                <ul
                                                    className={cx('sub-nav', {
                                                        active: this.state
                                                            .mainMenuIsOpened,
                                                    })}
                                                >
                                                    {mainCategories.map(
                                                        (category, i) => {
                                                            return (
                                                                <li
                                                                    key={`sub-nav-item-${i}`}
                                                                    className={cx(
                                                                        'sub-nav-item',
                                                                        `sub-nav-item--${category.name}`,
                                                                    )}
                                                                >
                                                                    <Link
                                                                        to={`/archives/${category.name}`}
                                                                        className={cx(
                                                                            {
                                                                                isOpened:
                                                                                    category.name ===
                                                                                        'Work' &&
                                                                                    this
                                                                                        .state
                                                                                        .mainMenuIsOpened,
                                                                            },
                                                                        )}
                                                                        onClick={(
                                                                            e,
                                                                        ) =>
                                                                            this._handleOnClickSubMenu(
                                                                                e,
                                                                                category.name,
                                                                            )
                                                                        }
                                                                    >
                                                                        {
                                                                            category.name
                                                                        }
                                                                    </Link>
                                                                    {/* sub category list */}
                                                                    {category.name ===
                                                                        'Work' && (
                                                                        <ul
                                                                            className={cx(
                                                                                'work-sub',
                                                                                {
                                                                                    active: this
                                                                                        .state
                                                                                        .subMenuIsOpened,
                                                                                },
                                                                            )}
                                                                        >
                                                                            {category.subCategories.map(
                                                                                (
                                                                                    categoryWithSub,
                                                                                    i,
                                                                                ) => {
                                                                                    return (
                                                                                        <li
                                                                                            key={`work-sub-item-${i}`}
                                                                                            className={cx(
                                                                                                'work-sub-item',
                                                                                            )}
                                                                                        >
                                                                                            <Link
                                                                                                to={`/archives/Work/${categoryWithSub.name}`}
                                                                                                onClick={() => {
                                                                                                    this._clearState();
                                                                                                }}
                                                                                            >
                                                                                                -{' '}
                                                                                                {
                                                                                                    categoryWithSub.name
                                                                                                }
                                                                                            </Link>
                                                                                        </li>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </ul>
                                                                    )}
                                                                </li>
                                                            );
                                                        },
                                                    )}
                                                </ul>
                                            </li>
                                        </div>
                                        <div className={cx('sns')}>
                                            <a
                                                href={sns.instagramUrl}
                                                className={cx('instagram')}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="HERA Official Instaram"
                                            >
                                                Instagram
                                            </a>
                                            <a
                                                href={sns.youtubeUrl}
                                                className={cx('youtube')}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="HERA Official Youtube"
                                            >
                                                Youtube
                                            </a>
                                        </div>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    )}
                    <div
                        className={cx('header-container', {
                            borderless: atHomeRoute,
                        })}
                    >
                        <header
                            className={cx({
                                borderless: this.props.borderless,
                            })}
                        >
                            <div className={cx('concept-title')}>
                                <Link to={'/'}>
                                    <span>HR ARCHIVE</span>
                                </Link>
                            </div>
                            <nav
                                className={cx('home-nav', {
                                    'home-nav--mobile': width <= md,
                                })}
                            >
                                {/* md 사이즈 이상 (테스크톱 크기) */}
                                {width > md && (
                                    <ul>
                                        <li
                                            className={cx(
                                                'nav-item',
                                                'nav-item--herakim',
                                            )}
                                        >
                                            <Link to={`/about`}>HERA KIM</Link>
                                        </li>
                                        <li
                                            className={cx(
                                                'nav-item',
                                                'nav-item--projects',
                                            )}
                                        >
                                            <Link to={`/projects`}>
                                                PROJECTS
                                            </Link>
                                        </li>
                                        <li
                                            className={cx(
                                                'nav-item',
                                                'nav-item--archives',
                                            )}
                                            onMouseOver={
                                                this._handleOnMouseOver
                                            }
                                            onMouseLeave={
                                                this._handleOnMouseLeave
                                            }
                                        >
                                            <Link to={`/archives`}>
                                                ARCHIVES
                                            </Link>
                                            <ul
                                                className={cx('sub-nav', {
                                                    active:
                                                        this.state
                                                            .selectedCategory ===
                                                        'work',
                                                })}
                                                onMouseLeave={(e) =>
                                                    this._handleOnMouseLeave(
                                                        e,
                                                        'sub',
                                                    )
                                                }
                                            >
                                                {mainCategories.map(
                                                    (category, i) => {
                                                        return (
                                                            <li
                                                                key={`sub-nav-item-${i}`}
                                                                className={cx(
                                                                    'sub-nav-item',
                                                                    `sub-nav-item--${category.name}`,
                                                                )}
                                                                onMouseOver={(
                                                                    e,
                                                                ) =>
                                                                    this._handleOnMouseOver(
                                                                        e,
                                                                        category.name,
                                                                    )
                                                                }
                                                            >
                                                                <Link
                                                                    to={`/archives/${category.name}`}
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </Link>
                                                                {category.name ===
                                                                    'Work' && (
                                                                    <ul
                                                                        className={cx(
                                                                            'work-sub',
                                                                            {
                                                                                active:
                                                                                    this
                                                                                        .state
                                                                                        .selectedSubCategory ===
                                                                                    'Work',
                                                                            },
                                                                        )}
                                                                    >
                                                                        {category.subCategories.map(
                                                                            (
                                                                                categoryWithSub,
                                                                                i,
                                                                            ) => {
                                                                                return (
                                                                                    <li
                                                                                        key={`work-sub-item-${i}`}
                                                                                        className={cx(
                                                                                            'work-sub-item',
                                                                                        )}
                                                                                    >
                                                                                        <Link
                                                                                            to={`/archives/Work/${categoryWithSub.name}`}
                                                                                        >
                                                                                            -{' '}
                                                                                            {
                                                                                                categoryWithSub.name
                                                                                            }
                                                                                        </Link>
                                                                                    </li>
                                                                                );
                                                                            },
                                                                        )}
                                                                    </ul>
                                                                )}
                                                            </li>
                                                        );
                                                    },
                                                )}
                                            </ul>
                                        </li>
                                    </ul>
                                )}
                            </nav>
                        </header>
                    </div>
                    <main
                        className={cx(
                            { fadeUp: this.props.fadeUp },
                            { fadeIn: this.props.fadeIn },
                        )}
                    >
                        {this.props.children}
                    </main>
                </div>
            );
    }
}

export default DesktopLayout;
