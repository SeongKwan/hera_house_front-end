import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home/Home';
import Archive from './pages/Archive/Archive';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Admin from './pages/Admin/Admin';
import 'bootstrap/dist/css/bootstrap.css';

const routes = [
  { path: '/', name: 'Home', Component: Home, exact: true },
  { path: '/archive', name: 'Archive', Component: Archive },
  { path: '/admin', name: 'Admin Board', Component: Admin },
  
  { path: '*', name: 'NotFoundPage', Component: NotFoundPage },
]

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map(({ path, Component, exact }) => (
            <Route key={path} exact={exact === true ? true : false} path={path}>
              <Component />
            </Route>
          ))}
          </Switch>
      </Router>
    );
  }
}

export default App;