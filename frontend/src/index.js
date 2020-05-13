import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import Favicon from 'react-favicon';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Favicon url="https://handshake-production-cdn.joinhandshake.com/assets/favicon-d6b3be8966fbadf95833dc4a6a405e696cf638275db7ff77964af2e3d9f7919e.ico?v=2" />
      <App />
    </div>
  </Provider>,
  document.getElementById('root'),
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
