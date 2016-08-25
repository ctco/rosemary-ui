import 'assets/scss/_page.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware, compose} from 'redux';

import reducers from './reducers';
import Store from './state/main-store';
import routConfig from './config/route-config';

const store = createStore(reducers, Store, compose(
    applyMiddleware(),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

ReactDOM.render((
    <Provider store={store}>
        {routConfig}
    </Provider>
), document.querySelector('#app'));
