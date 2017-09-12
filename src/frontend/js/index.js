import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import es6Promise from 'es6-promise';
import 'babel-polyfill';
import 'isomorphic-fetch';

import configureStore from 'config/store';
import App from './app';


// Load SCSS
import '../style/app.scss';

es6Promise.polyfill();

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

// Render app
render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NewApp = require('./app').default; // eslint-disable-line global-require

    render(NewApp);
  });
}