import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import {$, expect, assert} from '../test_helper';
import Popup from '../../src/Popup';

describe('Popup', () => {
    var clock;
    before(() => {
        clock = sinon.useFakeTimers();
    });

    after(() => {
        clock.restore();
    });

    it('should render content into body', () => {
        let instance = TestUtils.renderIntoDocument(
            <Popup attachment='bottom right' on='click'>
                <button>Show popup</button>
                <span className='open-test-content'>Popup content</span>
            </Popup>
        );

        expect($('.open-test-content')).not.to.exist;

        var button = TestUtils.findRenderedDOMComponentWithTag(instance, 'button');
        TestUtils.Simulate.click(button);
        clock.tick(51);

        expect($('.open-test-content')).to.exist;
    });

    it('should toggle on click', () => {
        let instance = TestUtils.renderIntoDocument(
            <Popup attachment='bottom right' on='click'>
                <button>Show popup</button>
                <span>Popup content</span>
            </Popup>
        );

        expect(instance.state.popupState).to.contain('closed');

        var button = TestUtils.findRenderedDOMComponentWithTag(instance, 'button');
        TestUtils.Simulate.click(button);
        clock.tick(51);

        expect(instance.state.popupState).to.contain('open');

        TestUtils.Simulate.click(button);

        expect(instance.state.popupState).to.contain('closing');
        clock.tick(600);
        expect(instance.state.popupState).to.contain('closed');
    });

    it('should appear on hover', () => {
        let instance = TestUtils.renderIntoDocument(
            <Popup attachment='bottom right'>
                <button>Show popup</button>
                <span>Popup content</span>
            </Popup>
        );

        expect(instance.state.popupState).to.contain('closed');
        var button = TestUtils.findRenderedDOMComponentWithTag(instance, 'button');
        TestUtils.SimulateNative.mouseOver(button);
        clock.tick(51);

        expect(instance.state.popupState).to.contain('open');

        TestUtils.SimulateNative.mouseOut(button);

        expect(instance.state.popupState).to.contain('closing');
    });

    it('should disappear on click outside', () => {
        let instance = TestUtils.renderIntoDocument(
            <Popup attachment='bottom right' on='click'>
                <button>Show popup</button>
                <span>Popup content</span>
            </Popup>
        );

        expect(instance.state.popupState).to.contain('closed');
        var button = TestUtils.findRenderedDOMComponentWithTag(instance, 'button');
        TestUtils.Simulate.click(button);
        clock.tick(51);

        expect(instance.state.popupState).to.contain('open');

        $('body').trigger('click');

        expect(instance.state.popupState).to.contain('closing');
    });

    it('should not disappear on click outside for modal popup', () => {
        let instance = TestUtils.renderIntoDocument(
            <Popup attachment='middle center' on='click' modal={true}>
                <button>Show popup</button>
                <span>Popup content</span>
            </Popup>
        );

        expect(instance.state.popupState).to.contain('closed');
        var button = TestUtils.findRenderedDOMComponentWithTag(instance, 'button');
        TestUtils.Simulate.click(button);
        clock.tick(51);

        expect(instance.state.popupState).to.contain('open');
        $('body').trigger('click');
        expect(instance.state.popupState).to.contain('open');
    });
});
