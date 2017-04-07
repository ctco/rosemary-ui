import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import {$, renderComponent, expect, assert} from '../../test_helper';
import MultiSelectPopup from '../../../src/components/select/MultiSelectPopup';

import sinon from 'sinon';

describe('MultiSelectPopup', () => {
    function getIds(call) {
        return call.args[0];
    }

    it('should fire change event on row click', ()=> {
        let callback = sinon.spy();

        let instance = TestUtils.renderIntoDocument(
            <MultiSelectPopup options={
                [
                    {id: 1, displayString: 'AA'},
                    {id: 2, displayString: 'BB'}
                ]
            } onChange={callback}/>
        );

        let tr = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'tr')[0];
        TestUtils.Simulate.click(tr);

        let search = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0];
        TestUtils.Simulate.change(search, {target: {value: 'B'}});

        tr = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'tr')[0];
        TestUtils.Simulate.click(tr);

        expect(callback.calledTwice).to.equal(true);

        expect(getIds(callback.getCall(0)).length).to.equal(1);
        expect(getIds(callback.getCall(0))[0]).to.equal(1);

        expect(getIds(callback.getCall(1)).length).to.equal(2);
        expect(getIds(callback.getCall(1))[0]).to.equal(1);
        expect(getIds(callback.getCall(1))[1]).to.equal(2);
    });
});