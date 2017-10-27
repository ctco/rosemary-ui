import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {renderComponent, expect, assert} from '../test_helper';
import Input from '../../src/Input/Input';

describe('Input', () => {
    it('should have correct class', ()=> {
        let instance = TestUtils.renderIntoDocument(
            <Input/>
        );
        assert.ok(TestUtils.findRenderedDOMComponentWithClass(instance, 'text-input'));
    });
    it('Should call onChange callback', (done) => {
        let doneOp = () => {
            done();
        };

        let instance = TestUtils.renderIntoDocument(
            <Input onChange={doneOp}/>
        );
        let node = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
        assert.ok(node);

        TestUtils.Simulate.change(node);
    });

    describe('disabled', ()=> {
        it('should have correct class', ()=> {
            let instance = TestUtils.renderIntoDocument(
                <Input disabled/>
            );
            assert.ok(TestUtils.findRenderedDOMComponentWithClass(instance, 'disabled'));
        });
        it('should not call onChange callback', (done)=> {
            let doneOp = () => {
                assert.fail(0, 1, 'onChange callback is called when input is disabled');
            };

            let instance = TestUtils.renderIntoDocument(
                <Input disabled onChange={doneOp}/>
            );

            let node = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
            assert.ok(node);

            TestUtils.Simulate.change(node);
            done();
        });
    });
});