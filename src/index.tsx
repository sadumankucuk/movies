import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import 'antd/dist/antd.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <App />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
