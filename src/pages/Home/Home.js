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
const youtubeUrl = "https://www.youtube.com";
const instagramUrl = "https://instagram.com/herakim_______?igshid=kkuvihytwxl3";

@withRouter
@inject('categoryStore', 'loginStore')
@observer
class Home extends Component {

    render() {

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
                <DesktopLayout fadeIn>
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
                        <a href={youtubeUrl} className={cx('youtube')} target="_blank" title="HERA Official Youtube">Youtube</a>
                        <a href={instagramUrl} className={cx('instagram')} target="_blank" title="HERA Official Instaram">Instagram</a>
                    </div>
                </DesktopLayout>
            </div>
        );

    }
}

export default Home;


