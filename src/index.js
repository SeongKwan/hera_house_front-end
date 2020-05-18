import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import stores from './stores';

configure({ 
    enforceActions: "observed"
});

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();