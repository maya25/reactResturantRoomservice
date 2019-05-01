import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Provider as StoreProvider } from 'react-redux';
import 'moment/locale/he';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';

moment.locale('he');

const app = (
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
