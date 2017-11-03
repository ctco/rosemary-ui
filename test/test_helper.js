import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import jsdom from 'jsdom';
import chai, { expect ,assert} from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
let reducers = () => {};
import register from 'ignore-styles';


register(['.sass', '.scss', '.css']);


let doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
let win = doc.defaultView;
global.document = doc;
global.window = win;
export const $ = _$(window);

chaiJquery(chai, chai.util, $);

propagateToGlobal(win);

function propagateToGlobal(window) {
    for (let key in window) {
        if (!window.hasOwnProperty(key)) continue;
        if (key in global) continue;
        global[key] = window[key];
    }
}

export function renderComponent(ComponentClass, props = {}, state = {}) {
    const componentInstance = TestUtils.renderIntoDocument(
        <Provider store={createStore(reducers, state)}>
            <ComponentClass {...props} />
        </Provider>
    );

    return $(ReactDOM.findDOMNode(componentInstance));
}

$.fn.simulate = function(eventName, value) {
    if (value) {
        this.val(value);
    }
    TestUtils.Simulate[eventName](this[0]);
};

export {expect, assert};
