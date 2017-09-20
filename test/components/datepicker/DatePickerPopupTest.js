import {$, renderComponent, expect, assert} from '../../test_helper';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import sinon from 'sinon';

import DatePickerPopup from '../../../src/components/datepicker/DatePickerPopup';
import Select from '../../../src/components/select/Select';
import {isMonthTheSame, format, parse} from '../../../src/util/date-utils';

describe('DatePickerPopup', () => {
    it('should render years by minDate and maxDate', ()=> {
        let instance = TestUtils.renderIntoDocument(
            <DatePickerPopup value={parse('01.01.2016', 'DD.MM.YYYY')}
                             minDate={parse('01.01.2016', 'DD.MM.YYYY')}
                             maxDate={parse('31.12.2016', 'DD.MM.YYYY')} />
        );

        let years = TestUtils.scryRenderedComponentsWithType(instance, Select)[1];

        expect(years.props.options.length).to.equal(1);
        expect(years.props.options[0].id).to.equal(2016);

        instance = TestUtils.renderIntoDocument(
            <DatePickerPopup value={parse('01.01.2016', 'DD.MM.YYYY')}
                             minDate={parse('01.01.2015', 'DD.MM.YYYY')}
                             maxDate={parse('31.12.2017', 'DD.MM.YYYY')} />
        );

        years = TestUtils.scryRenderedComponentsWithType(instance, Select)[1];

        expect(years.props.options.length).to.equal(3);
        expect(years.props.options[0].id).to.equal(2015);
        expect(years.props.options[1].id).to.equal(2016);
        expect(years.props.options[2].id).to.equal(2017);
    });

    it('should allow to selected months between minDate and maxDate - simple', ()=> {
        let instance = TestUtils.renderIntoDocument(
            <DatePickerPopup month={parse('01.01.2016', 'DD.MM.YYYY')}
                             minDate={parse('01.01.2016', 'DD.MM.YYYY')}
                             maxDate={parse('31.12.2016', 'DD.MM.YYYY')} />
        );

        let months = TestUtils.scryRenderedComponentsWithType(instance, Select)[0];

        expect(months.props.options.length).to.equal(12);
        expect(months.props.options[0].displayString).to.equal('January');
        expect(months.props.options[1].displayString).to.equal('February');
        expect(months.props.options[2].displayString).to.equal('March');
        expect(months.props.options[3].displayString).to.equal('April');
        expect(months.props.options[4].displayString).to.equal('May');
        expect(months.props.options[5].displayString).to.equal('June');
        expect(months.props.options[6].displayString).to.equal('July');
        expect(months.props.options[7].displayString).to.equal('August');
        expect(months.props.options[8].displayString).to.equal('September');
        expect(months.props.options[9].displayString).to.equal('October');
        expect(months.props.options[10].displayString).to.equal('November');
        expect(months.props.options[11].displayString).to.equal('December');
    });

    it('should allow to selected months between minDate and maxDate - min and max in same year', ()=> {
        let instance = TestUtils.renderIntoDocument(
            <DatePickerPopup month={parse('01.06.2016', 'DD.MM.YYYY')}
                             minDate={parse('01.05.2016', 'DD.MM.YYYY')}
                             maxDate={parse('31.10.2016', 'DD.MM.YYYY')} />
        );

        let months = TestUtils.scryRenderedComponentsWithType(instance, Select)[0];

        expect(months.props.options.length).to.equal(6);
        expect(months.props.options[0].displayString).to.equal('May');
        expect(months.props.options[1].displayString).to.equal('June');
        expect(months.props.options[2].displayString).to.equal('July');
        expect(months.props.options[3].displayString).to.equal('August');
        expect(months.props.options[4].displayString).to.equal('September');
        expect(months.props.options[5].displayString).to.equal('October');
    });

    it('should allow to selected months between minDate and maxDate - showing for min year', ()=> {
        let instance = TestUtils.renderIntoDocument(
            <DatePickerPopup month={parse('01.06.2016', 'DD.MM.YYYY')}
                             minDate={parse('01.05.2016', 'DD.MM.YYYY')}
                             maxDate={parse('31.10.2017', 'DD.MM.YYYY')} />
        );

        let months = TestUtils.scryRenderedComponentsWithType(instance, Select)[0];

        expect(months.props.options.length).to.equal(8);
        expect(months.props.options[0].displayString).to.equal('May');
        expect(months.props.options[7].displayString).to.equal('December');
    });

    it('should allow to selected months between minDate and maxDate - showing for max year', ()=> {
        let instance = TestUtils.renderIntoDocument(
            <DatePickerPopup month={parse('01.06.2017', 'DD.MM.YYYY')}
                             minDate={parse('01.05.2016', 'DD.MM.YYYY')}
                             maxDate={parse('31.10.2017', 'DD.MM.YYYY')} />
        );

        let months = TestUtils.scryRenderedComponentsWithType(instance, Select)[0];

        expect(months.props.options.length).to.equal(10);
        expect(months.props.options[0].displayString).to.equal('January');
        expect(months.props.options[9].displayString).to.equal('October');
    });

    it('should allow to selected months between minDate and maxDate - showing for year between', ()=> {
        let instance = TestUtils.renderIntoDocument(
            <DatePickerPopup month={parse('01.06.2017', 'DD.MM.YYYY')}
                             minDate={parse('01.05.2016', 'DD.MM.YYYY')}
                             maxDate={parse('31.10.2018', 'DD.MM.YYYY')} />
        );

        let months = TestUtils.scryRenderedComponentsWithType(instance, Select)[0];

        expect(months.props.options.length).to.equal(12);
        expect(months.props.options[0].displayString).to.equal('January');
        expect(months.props.options[11].displayString).to.equal('December');
    });

    it('should select available month on year change - when greater than max', (done)=> {
        let check = (month) => {
            if (isMonthTheSame(month, parse('01.10.2018', 'DD.MM.YYYY'))) {
                done();
            } else {
                assert.fail();
            }
        };

        let instance = TestUtils.renderIntoDocument(
            <DatePickerPopup month={parse('01.11.2017', 'DD.MM.YYYY')}
                             onMonthChange={check}
                             minDate={parse('01.05.2016', 'DD.MM.YYYY')}
                             maxDate={parse('31.10.2018', 'DD.MM.YYYY')} />
        );

        let years = TestUtils.scryRenderedComponentsWithType(instance, Select)[1];

        years.select({id: 2018, displayString: '2018'});
    });

    it('should select available month on year change - when less than min', (done)=> {
        let check = (month) => {
            if (isMonthTheSame(month, parse('01.05.2016', 'DD.MM.YYYY'))) {
                done();
            } else {
                assert.fail();
            }
        };

        let instance = TestUtils.renderIntoDocument(
            <DatePickerPopup month={parse('01.04.2017', 'DD.MM.YYYY')}
                             onMonthChange={check}
                             minDate={parse('01.05.2016', 'DD.MM.YYYY')}
                             maxDate={parse('31.10.2018', 'DD.MM.YYYY')} />
        );

        let years = TestUtils.scryRenderedComponentsWithType(instance, Select)[1];

        years.select({id: 2016, displayString: '2016'});
    });

    it('should not allow to go left when minDate is exceeded', (done)=> {
        let check = (month) => {
            if (isMonthTheSame(month, parse('01.06.2016', 'DD.MM.YYYY'))) {
                done();
            } else {
                assert.fail();
            }
        };

        let instance = TestUtils.renderIntoDocument(
            <DatePickerPopup month={parse('01.05.2016', 'DD.MM.YYYY')}
                             onMonthChange={check}
                             minDate={parse('01.05.2016', 'DD.MM.YYYY')}
                             maxDate={parse('31.10.2016', 'DD.MM.YYYY')} />
        );

        let arrowLeft = TestUtils.findRenderedDOMComponentWithClass(instance, 'date-picker-popup__arrow--left');
        TestUtils.Simulate.click(arrowLeft);

        instance = TestUtils.renderIntoDocument(
            <DatePickerPopup month={parse('01.07.2016', 'DD.MM.YYYY')}
                             onMonthChange={check}
                             minDate={parse('01.05.2016', 'DD.MM.YYYY')}
                             maxDate={parse('31.10.2016', 'DD.MM.YYYY')} />
        );

        arrowLeft = TestUtils.findRenderedDOMComponentWithClass(instance, 'date-picker-popup__arrow--left');
        TestUtils.Simulate.click(arrowLeft);
    });

    it('should not allow to go right when maxDate is exceeded', (done)=> {
        let check = (month) => {
            if (isMonthTheSame(month, parse('01.06.2016', 'DD.MM.YYYY'))) {
                done();
            } else {
                assert.fail();
            }
        };

        let instance = TestUtils.renderIntoDocument(
            <DatePickerPopup month={parse('01.10.2016', 'DD.MM.YYYY')}
                             onMonthChange={check}
                             minDate={parse('01.05.2016', 'DD.MM.YYYY')}
                             maxDate={parse('31.10.2016', 'DD.MM.YYYY')} />
        );

        let arrowRight = TestUtils.findRenderedDOMComponentWithClass(instance, 'date-picker-popup__arrow--right');
        TestUtils.Simulate.click(arrowRight);

        instance = TestUtils.renderIntoDocument(
            <DatePickerPopup month={parse('01.05.2016', 'DD.MM.YYYY')}
                             onMonthChange={check}
                             minDate={parse('01.05.2016', 'DD.MM.YYYY')}
                             maxDate={parse('31.10.2016', 'DD.MM.YYYY')} />
        );

        arrowRight = TestUtils.findRenderedDOMComponentWithClass(instance, 'date-picker-popup__arrow--right');
        TestUtils.Simulate.click(arrowRight);
    });
});