import {$, renderComponent, expect, assert} from '../../test_helper';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import sinon from 'sinon';

import DatePickerCalendar from '../../../src/components/datepicker/DatePickerCalendar';
import {format, parse} from '../../../src/util/date-utils';

describe('DatePickerCalendar', () => {
    it('should render from 28.12.2015 to 07.02.2016 for month Jan 2016', ()=> {
        let instance = TestUtils.renderIntoDocument(
            <DatePickerCalendar month={parse('01.01.2016', 'DD.MM.YYYY')}/>
        );

        let grid = TestUtils.findRenderedDOMComponentWithClass(instance, 'date-picker-calendar__grid');

        expect($(grid).find('tr:first-child td:first-child div')).to.contain('28');
        expect($(grid).find('tr:last-child td:last-child div')).to.contain('7');
    });

    it('should execute selected callback on click', (done)=> {
        let check = (value) => {
            expect(format(value, 'DD.MM.YYYY')).to.equal('28.12.2015');
            done();
        };

        let instance = TestUtils.renderIntoDocument(
            <DatePickerCalendar month={parse('01.01.2016', 'DD.MM.YYYY')} onSelected={check}/>
        );

        let grid = TestUtils.findRenderedDOMComponentWithClass(instance, 'date-picker-calendar__grid');
        let tbody = grid.children[0];
        let tr = tbody.children[0];
        let td = tr.children[0]; //28.12.2015
        TestUtils.Simulate.click(td);
    });

    it('should disabled dates less than min date', (done)=> {
        let check = (value) => {
            if (format(value, 'DD.MM.YYYY') === '28.12.2015') {
                assert.fail('should not be called');
            } else {
                done();
            }
        };

        let instance = TestUtils.renderIntoDocument(
            <DatePickerCalendar month={parse('01.01.2016', 'DD.MM.YYYY')}
                                onSelected={check}
                                minDate={parse('01.01.2016', 'DD.MM.YYYY')}/>
        );

        let grid = TestUtils.findRenderedDOMComponentWithClass(instance, 'date-picker-calendar__grid');
        let tbody = grid.children[0];
        let tr = tbody.children[0];

        let td = tr.children[0]; //28.12.2015
        expect(td.getAttribute('data-disabled')).to.equal('true');
        TestUtils.Simulate.click(td);

        td = tr.children[4]; //01.01.2016
        TestUtils.Simulate.click(td);
        expect(td.getAttribute('data-disabled')).to.equal(null);
    });

    it('should not execute selected callback on click if greater than max date', (done)=> {
        let check = (value) => {
            if (format(value, 'DD.MM.YYYY') === '28.12.2015') {
                assert.fail('should not be called');
            } else {
                done();
            }
        };

        let instance = TestUtils.renderIntoDocument(
            <DatePickerCalendar month={parse('01.01.2016', 'DD.MM.YYYY')}
                                onSelected={check}
                                maxDate={parse('31.01.2016', 'DD.MM.YYYY')}/>
        );

        let grid = TestUtils.findRenderedDOMComponentWithClass(instance, 'date-picker-calendar__grid');
        let tbody = grid.children[0];
        let tr = tbody.children[5];
        let td = tr.children[0]; //01.02.2016
        TestUtils.Simulate.click(td);
        expect(td.getAttribute('data-disabled')).to.equal('true');

        tr = tbody.children[4];
        td = tr.children[6]; //31.01.2016
        TestUtils.Simulate.click(td);
        expect(td.getAttribute('data-disabled')).to.equal(null);
    });
});