import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Switch, Route } from 'react-router-dom';
import styles from './Admin.module.scss';
import classNames from 'classnames/bind';
import AdminCategory from '../../components/AdminCategory/AdminCategory';
import AdminPost from '../../components/AdminPost/AdminPost';
import LayoutAdmin from '../../components/LayoutAdmin/LayoutAdmin';
import AdminPostWrite from '../../components/AdminPostWrite/AdminPostWrite';
import AdminLogin from '../AdminLogin/AdminLogin';
import LayoutAdminMain from '../../components/LayoutAdminMain/LayoutAdminMain';

const cx = classNames.bind(styles);
let timer = null;

@withRouter
@inject('authStore', 'loginStore')
@observer
class Admin extends Component {
    componentDidMount() {
        const { isLoggedIn, loggedIn } = this.props.loginStore;
        const entryPoint = this.props.location.pathname.split('/')[1];
        if (!isLoggedIn && !loggedIn) {
            console.log('1');
            if (entryPoint === 'admin') {
                this.props.history.replace('/admin/login');
            }
        } else {
            console.log('2');
            // this.props.history.replace('/admin');
        }

    }
    render() {
        const { path } = this.props.match;
        const { isLoggedIn, loggedIn } = this.props.loginStore;

        if (!isLoggedIn && !loggedIn) {
            return <div className={cx('Admin', 'is-not-logged-in')}>
                <AdminLogin />
            </div>
        }

        return (
            <div className={cx('Admin')}>
                <Switch>
                    {/* <Route path={`${path}`} exact>
                        <LayoutAdminMain path={path}>
                            <LayoutAdmin sectionTitle="공지사항 & 업데이트">
                                <AdminMain />
                            </LayoutAdmin>
                        </LayoutAdminMain>
                    </Route> */}
                    <Route path={`${path}/category`}>
                        <LayoutAdminMain path={path}>
                            <LayoutAdmin sectionTitle="카테고리 관리">
                                <AdminCategory />
                            </LayoutAdmin>
                        </LayoutAdminMain>
                    </Route>
                    <Route path={`${path}/post`} exact>
                        <LayoutAdminMain path={path}>
                            <LayoutAdmin sectionTitle="게시물 관리">
                                <AdminPost />
                            </LayoutAdmin>
                        </LayoutAdminMain>
                    </Route>
                    <Route path={`${path}/post/write`}>
                        <AdminPostWrite type={'write'} />
                    </Route>
                    <Route path={`${path}/post/edit/:postId`}>
                        <AdminPostWrite type={'edit'} />
                    </Route>
                    <Route path={`${path}/manual`}>
                        <LayoutAdminMain path={path}>
                            <LayoutAdmin sectionTitle="사이트 사용설명서">
                                <AdminManual />
                            </LayoutAdmin>
                        </LayoutAdminMain>
                    </Route>
                    <Route component={() => {
                        return (<LayoutAdminMain path={path}>
                            <LayoutAdmin sectionTitle="게시물 관리">
                                <AdminPost />
                            </LayoutAdmin>
                        </LayoutAdminMain>)
                    }} />
                </Switch>
            </div>
        );
    }
}

export default Admin;

const AdminMain = () => {
    return (
        <div>
            공지사항 목록을 넣을 예정
        </div>
    );
};
const AdminManual = () => {
    return (
        <div>
            사이트관련 전반적인 운영방법 및 관리에 대하여 구글 문서를 Embed 하거나 직접 작성할 예정
        </div>
    );
};