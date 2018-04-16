import 'assets/scss/_page.scss';

// test rebuild - all in the dev mode
import '../src/assets/scss/_all.scss';

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

function main() {
    const root = document.querySelector('#app');
    // TODO: explain magic
    ReactDOM.unmountComponentAtNode(root);
    ReactDOM.render(
        <Provider store={store}>
            {routConfig}
        </Provider>
    , root);
}
main();

/*  HOT Reload from webpack dev server  */
if (module && module.hot) {
    module.hot.accept();

    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers');
        store.replaceReducer(nextRootReducer);
    });

    module.hot.accept('./app.js', main);
}