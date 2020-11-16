import React, { Component } from 'react';
import styles from './App.module.scss';
import classNames from 'classnames/bind';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home/Home';
import Archive from './pages/Archive/Archive';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Admin from './pages/Admin/Admin';
import { inject, observer } from 'mobx-react';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';

const routes = [
  { path: '/', name: 'Home', Component: Home, exact: true },
  { path: '/about', name: 'HERA KIM', Component: About },
  { path: '/archive', name: 'Archive', Component: Archive },
  { path: '/admin', name: 'Admin Board', Component: Admin },
  { path: '/projects', name: 'PROJECTS', Component: Projects },

  { path: '*', name: 'NotFoundPage', Component: NotFoundPage },
]

const cx = classNames.bind(styles);


@inject('commonStore', 'loginStore', 'authStore')
@observer
class App extends Component {


  render() {
    return (
      <div className={cx('App', { 'disabled-scroll': !this.props.commonStore.enableScroll })}>
        <Router>
          <Switch>
            {routes.map(({ path, Component, exact }) => (
              <Route key={path} exact={exact === true ? true : false} path={path}>
                <Component />
              </Route>
            ))}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;