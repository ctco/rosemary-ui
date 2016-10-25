import moment from 'moment';

import {expect} from '../test_helper';

import  {
    isWeekend,
    isFirstDayOfWeek,
    isToday,
    isCurrentYear,
    isAfter,
    isBetweenNotInclusive,
    isDayTheSame,
    isMonthTheSame,
    isYearTheSame,
    isDayBefore,
    isDayBeforeOrTheSame,
    isDayAfter,
    isDayAfterOrTheSame,
    getToday,
    getMonth,
    getYear,
    getWeekDayByIndex,
    getFirstDayOfMonth,
    getLastDayOfMonth,
    getFirstDayOfYear,
    getFirstDayOfWeek,
    getFirstDayOfPreviousWeek,
    getMonths,
    setMonth,
    setYear,
    addMonths,
    addYears,
    parse,
    format,
    clone,
    getConfiguredMoment,
    getFirstDaysOfAllMonths
    } from '../../src/util/date-utils';

describe('date utils', () => {
    describe('getFirstDaysOfAllMonths', ()=> {

        it('should return months by year', () => {
            var months = getFirstDaysOfAllMonths(2016);

            expect(months.length).to.equal(12);
            expect(format(months[0], 'DD.MM.YYYY')).to.equal('01.01.2016');
            expect(format(months[1], 'DD.MM.YYYY')).to.equal('01.02.2016');
            expect(format(months[2], 'DD.MM.YYYY')).to.equal('01.03.2016');
            expect(format(months[3], 'DD.MM.YYYY')).to.equal('01.04.2016');
            expect(format(months[4], 'DD.MM.YYYY')).to.equal('01.05.2016');
            expect(format(months[5], 'DD.MM.YYYY')).to.equal('01.06.2016');
            expect(format(months[6], 'DD.MM.YYYY')).to.equal('01.07.2016');
            expect(format(months[7], 'DD.MM.YYYY')).to.equal('01.08.2016');
            expect(format(months[8], 'DD.MM.YYYY')).to.equal('01.09.2016');
            expect(format(months[9], 'DD.MM.YYYY')).to.equal('01.10.2016');
            expect(format(months[10], 'DD.MM.YYYY')).to.equal('01.11.2016');
            expect(format(months[11], 'DD.MM.YYYY')).to.equal('01.12.2016');
        });
    });

    describe('isWeekend', ()=> {
        it('should be true for saturday and sunday', () => {
            let saturday = isWeekend(moment('09.07.2016', 'DD.MM.YYYY'));
            let sunday = isWeekend(moment('09.07.2016', 'DD.MM.YYYY'));

            expect(sunday).to.equal(true);
            expect(saturday).to.equal(true);
        });

        it('should be false for monday - friday', () => {
            expect(isWeekend(moment('04.07.2016', 'DD.MM.YYYY'))).to.equal(false);
            expect(isWeekend(moment('05.07.2016', 'DD.MM.YYYY'))).to.equal(false);
            expect(isWeekend(moment('06.07.2016', 'DD.MM.YYYY'))).to.equal(false);
            expect(isWeekend(moment('07.07.2016', 'DD.MM.YYYY'))).to.equal(false);
            expect(isWeekend(moment('08.07.2016', 'DD.MM.YYYY'))).to.equal(false);
        });
    });

    describe('isFirstDayOfWeek', ()=> {
        it('should be true for monday', () => {
            expect(isFirstDayOfWeek(moment('04.07.2016', 'DD.MM.YYYY'))).to.equal(true);
        });

        it('should be false for tue - sun', () => {
            expect(isFirstDayOfWeek(moment('05.07.2016', 'DD.MM.YYYY'))).to.equal(false);
            expect(isFirstDayOfWeek(moment('06.07.2016', 'DD.MM.YYYY'))).to.equal(false);
            expect(isFirstDayOfWeek(moment('07.07.2016', 'DD.MM.YYYY'))).to.equal(false);
            expect(isFirstDayOfWeek(moment('08.07.2016', 'DD.MM.YYYY'))).to.equal(false);
            expect(isFirstDayOfWeek(moment('09.07.2016', 'DD.MM.YYYY'))).to.equal(false);
            expect(isFirstDayOfWeek(moment('10.07.2016', 'DD.MM.YYYY'))).to.equal(false);
        });
    });

    describe('isToday', ()=> {
        it('should be positive', () => {
            expect(isToday(moment())).to.equal(true);
        });

        it('should be negative', () => {
            expect(isToday(addMonths(moment(), -1))).to.equal(false);
        });
    });

    describe('isCurrentYear', ()=> {
        it('should be positive', () => {
            expect(isCurrentYear(moment())).to.equal(true);
        });

        it('should be negative', () => {
            expect(isCurrentYear(addYears(moment(), -1))).to.equal(false);
        });
    });

    describe('isAfter', ()=> {
        it('should be positive', () => {
            let date1 = parse('02.01.2016','DD.MM.YYYY');
            let date2 = parse('01.01.2016','DD.MM.YYYY');
            expect(isAfter(date1, date2)).to.equal(true);
        });

        it('should be negative', () => {
            let date1 = parse('01.01.2016','DD.MM.YYYY');
            let date2 = parse('01.01.2016','DD.MM.YYYY');
            expect(isAfter(date1, date2)).to.equal(false);

            date1 = parse('01.01.2016','DD.MM.YYYY');
            date2 = parse('02.01.2016','DD.MM.YYYY');
            expect(isAfter(date1, date2)).to.equal(false);
        });
    });

    describe('isBetweenNotInclusive', ()=> {
        it('should be positive', () => {
            let from = parse('01.01.2016','DD.MM.YYYY');
            let to = parse('10.01.2016','DD.MM.YYYY');
            expect(isBetweenNotInclusive(parse('05.01.2016','DD.MM.YYYY'), from, to)).to.equal(true);
        });

        it('should be negative', () => {
            let from = parse('05.01.2016','DD.MM.YYYY');
            let to = parse('10.01.2016','DD.MM.YYYY');
            expect(isBetweenNotInclusive(parse('04.01.2016','DD.MM.YYYY'), from, to)).to.equal(false);
            expect(isBetweenNotInclusive(parse('05.01.2016','DD.MM.YYYY'), from, to)).to.equal(false);
            expect(isBetweenNotInclusive(parse('10.01.2016','DD.MM.YYYY'), from, to)).to.equal(false);
            expect(isBetweenNotInclusive(parse('11.01.2016','DD.MM.YYYY'), from, to)).to.equal(false);
        });
    });

    describe('isDayTheSame', ()=> {
        it('should be positive', () => {
            let date1 = parse('01.01.2016','DD.MM.YYYY');
            let date2 = parse('01.01.2016','DD.MM.YYYY');
            expect(isDayTheSame(date1, date2)).to.equal(true);
        });

        it('should be negative', () => {
            let date1 = parse('01.01.2016','DD.MM.YYYY');
            let date2 = parse('01.01.2017','DD.MM.YYYY');
            expect(isDayTheSame(date1, date2)).to.equal(false);
        });
    });

    describe('isMonthTheSame', ()=> {
        it('should be positive', () => {
            let date1 = parse('10.01.2016','DD.MM.YYYY');
            let date2 = parse('20.01.2016','DD.MM.YYYY');
            expect(isMonthTheSame(date1, date2)).to.equal(true);
        });

        it('should be negative', () => {
            let date1 = parse('10.01.2016','DD.MM.YYYY');
            let date2 = parse('20.01.2017','DD.MM.YYYY');
            expect(isMonthTheSame(date1, date2)).to.equal(false);
        });
    });

    describe('getToday', ()=> {
        it('should return current day', () => {
            expect(isDayTheSame(moment(), getToday())).to.equal(true);
        });
    });

    describe('getMonth', ()=> {
        it('should retrieve month index from date, zero based', () => {
            expect(getMonth(parse('01.01.2016', 'DD.MM.YYYY'))).to.equal(0);
            expect(getMonth(parse('01.12.2016', 'DD.MM.YYYY'))).to.equal(11);
        });
    });

    describe('getYear', ()=> {
        it('should retrieve year from date', () => {
            expect(getYear(parse('01.01.2016', 'DD.MM.YYYY'))).to.equal(2016);
        });
    });

    describe('getWeekDayByIndex', ()=> {
        it('should create date by week day index, one based', () => {
            let date = getWeekDayByIndex(1);
            expect(format(date, 'dddd')).to.equal('Monday');

            date = getWeekDayByIndex(7);
            expect(format(date, 'dddd')).to.equal('Sunday');
        });
    });

    describe('getFirstDayOfMonth', ()=> {
        it('should retrieve first day of month', () => {
            let date = getFirstDayOfMonth(parse('10.12.2016', 'DD.MM.YYYY'));
            expect(format(date, 'DD.MM.YYYY')).to.equal('01.12.2016');
        });
    });

    describe('getLastDayOfMonth', ()=> {
        it('should retrieve first day of month', () => {
            let date = getLastDayOfMonth(parse('10.12.2016', 'DD.MM.YYYY'));
            expect(format(date, 'DD.MM.YYYY')).to.equal('31.12.2016');
        });
    });

    describe('getFirstDayOfYear', ()=> {
        it('should retrieve first day of year', () => {
            let date = getFirstDayOfYear(parse('10.12.2016', 'DD.MM.YYYY'));
            expect(format(date, 'DD.MM.YYYY')).to.equal('01.01.2016');
        });
    });

    describe('getFirstDayOfWeek', ()=> {
        it('should retrieve first day of week', () => {
            let date = getFirstDayOfWeek(parse('10.12.2016', 'DD.MM.YYYY'));
            expect(format(date, 'DD.MM.YYYY')).to.equal('05.12.2016');
        });
    });

    describe('getFirstDayOfPreviousWeek', ()=> {
        it('should retrieve first day of previous week', () => {
            let date = getFirstDayOfPreviousWeek(parse('10.12.2016', 'DD.MM.YYYY'));
            expect(format(date, 'DD.MM.YYYY')).to.equal('28.11.2016');
        });
    });

    describe('getMonths', ()=> {
        it('should retrieve array of month names', () => {
            let months = getMonths();
            expect(months.length).to.equal(12);
            expect(months[0]).to.equal('January');
            expect(months[11]).to.equal('December');
        });
    });

    describe('setMonth', ()=> {
        it('should set the month', () => {
            let date = setMonth(parse('31.12.2016', 'DD.MM.YYYY'), 10);
            expect(format(date, 'DD.MM.YYYY')).to.equal('30.11.2016');
        });
    });

    describe('setYear', ()=> {
        it('should set the year', () => {
            let date = setYear(parse('31.12.2016', 'DD.MM.YYYY'), 2017);
            expect(format(date, 'DD.MM.YYYY')).to.equal('31.12.2017');
        });
    });

    describe('addMonths', ()=> {
        it('should add/remove the specified amount of months', () => {
            let date = addMonths(parse('31.12.2016', 'DD.MM.YYYY'), -1);
            expect(format(date, 'DD.MM.YYYY')).to.equal('30.11.2016');
        });
    });

    describe('addYears', ()=> {
        it('should add/remove the specified amount of years', () => {
            let date = addYears(parse('31.12.2016', 'DD.MM.YYYY'), -2);
            expect(format(date, 'DD.MM.YYYY')).to.equal('31.12.2014');
        });
    });

    describe('clone', ()=> {
        it('should copy the date', () => {
            let date = parse('31.12.2016', 'DD.MM.YYYY');
            let cloned = addMonths(clone(date), -1);

            expect(format(date, 'DD.MM.YYYY')).to.equal('31.12.2016');
            expect(format(cloned, 'DD.MM.YYYY')).to.equal('30.11.2016');
        });
    });

    describe('getConfiguredMoment', ()=> {
        it('should be configured to have monday as first day of week', () => {
            let moment = getConfiguredMoment();
            expect(moment.localeData().firstDayOfWeek()).to.equal(1);
        });
    });

    describe('isDayBefore', ()=> {
        it('should be positive', () => {
            let date1 = parse('09.01.2016','DD.MM.YYYY');
            let date2 = parse('10.01.2016','DD.MM.YYYY');
            expect(isDayBefore(date1, date2)).to.equal(true);
        });

        it('should be negative', () => {
            let date1 = parse('10.01.2016','DD.MM.YYYY');
            let date2 = parse('10.01.2016','DD.MM.YYYY');
            expect(isDayBefore(date1, date2)).to.equal(false);

            date1 = parse('09.02.2016','DD.MM.YYYY');
            date2 = parse('10.01.2016','DD.MM.YYYY');
            expect(isDayBefore(date1, date2)).to.equal(false);
        });
    });

    describe('isDayBeforeOrTheSame', ()=> {
        it('should be positive', () => {
            let date1 = parse('09.01.2016','DD.MM.YYYY');
            let date2 = parse('10.01.2016','DD.MM.YYYY');
            expect(isDayBeforeOrTheSame(date1, date2)).to.equal(true);

            date1 = parse('10.01.2016','DD.MM.YYYY');
            date2 = parse('10.01.2016','DD.MM.YYYY');
            expect(isDayBeforeOrTheSame(date1, date2)).to.equal(true);
        });

        it('should be negative', () => {
            let date1 = parse('09.02.2016','DD.MM.YYYY');
            let date2 = parse('10.01.2016','DD.MM.YYYY');
            expect(isDayBeforeOrTheSame(date1, date2)).to.equal(false);
        });
    });

    describe('isDayAfter', ()=> {
        it('should be positive', () => {
            let date1 = parse('10.01.2016','DD.MM.YYYY');
            let date2 = parse('09.01.2016','DD.MM.YYYY');
            expect(isDayAfter(date1, date2)).to.equal(true);
        });

        it('should be negative', () => {
            let date1 = parse('10.01.2016','DD.MM.YYYY');
            let date2 = parse('10.01.2016','DD.MM.YYYY');
            expect(isDayAfter(date1, date2)).to.equal(false);

            date1 = parse('10.01.2016','DD.MM.YYYY');
            date2 = parse('09.02.2016','DD.MM.YYYY');
            expect(isDayAfter(date1, date2)).to.equal(false);
        });
    });

    describe('isDayAfterOrTheSame', ()=> {
        it('should be positive', () => {
            let date1 = parse('10.01.2016','DD.MM.YYYY');
            let date2 = parse('09.01.2016','DD.MM.YYYY');
            expect(isDayAfterOrTheSame(date1, date2)).to.equal(true);

            date1 = parse('10.01.2016','DD.MM.YYYY');
            date2 = parse('10.01.2016','DD.MM.YYYY');
            expect(isDayAfterOrTheSame(date1, date2)).to.equal(true);
        });

        it('should be negative', () => {
            let date1 = parse('10.01.2016','DD.MM.YYYY');
            let date2 = parse('09.02.2016','DD.MM.YYYY');
            expect(isDayAfterOrTheSame(date1, date2)).to.equal(false);
        });
    });
});