import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home/Home';
import Archive from './pages/Archive/Archive';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/archive', name: 'Archive', Component: Archive },
  { path: '*', name: 'NotFoundPage', Component: NotFoundPage },
]

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map(({ path, Component }) => (
            <Route key={path} exact={path === '/'} path={path}>
              <Component />
            </Route>
          ))}
          </Switch>
      </Router>
    );
  }
}

export default App;