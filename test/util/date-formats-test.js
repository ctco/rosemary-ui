import {expect} from '../test_helper';

import {getToday, getYear, isToday, parse, setYear} from '../../src/util/date-utils';

import {
    formatD,
    formatDDMMYYYY,
    formatDMonthTime,
    formatDMonthYear,
    formatFullMonth,
    formatFullMonthYear,
    formatRange,
    formatWeekDay,
    parseDDMMYYYY
} from '../../src/util/date-formats';

function getCurrentYear() {
    return getYear(getToday());
}

function changeYearToCurrent(date) {
    return setYear(date, getCurrentYear());
}

describe('date formats', () => {
    describe('formatDMonthYear', () => {
        it('should format correctly', () => {
            let date = changeYearToCurrent(parseDDMMYYYY('01.10.2016'));
            if (!isToday(date)) {
                expect(formatDMonthYear(date)).to.equal('1 Oct');
            }

            date = parseDDMMYYYY('02.10.2010');
            expect(formatDMonthYear(date)).to.equal('2 Oct 2010');

            expect(formatDMonthYear(getToday())).to.equal('Today');
        });
    });

    describe('formatDMonthTime', () => {
        it('should format correctly', () => {
            let date = parse('03.01.2016 16:15', 'DD.MM.YYYY HH:mm');
            expect(formatDMonthTime(date)).to.equal('3 Jan 16:15');
        });
    });

    describe('formatFullMonth', () => {
        it('should format correctly', () => {
            let date = parseDDMMYYYY('08.12.2016');
            expect(formatFullMonth(date)).to.equal('December');
        });
    });

    describe('formatFullMonthYear', () => {
        it('should format correctly for current year', () => {
            let date = changeYearToCurrent(parseDDMMYYYY('01.12.2016'));
            expect(formatFullMonthYear(date)).to.equal('December');
        });

        it('should format correctly for non current year', () => {
            let date = parseDDMMYYYY('01.12.2010');
            expect(formatFullMonthYear(date)).to.equal('December 2010');
        });
    });

    describe('range', () => {
        it('should format correctly for same month current year', () => {
            let from = changeYearToCurrent(parseDDMMYYYY('01.12.2016'));
            let to = changeYearToCurrent(parseDDMMYYYY('08.12.2016'));
            expect(formatRange(from, to)).to.equal('1 - 8 Dec');
        });

        it('should format correctly for current year', () => {
            let from = changeYearToCurrent(parseDDMMYYYY('01.01.2016'));
            let to = changeYearToCurrent(parseDDMMYYYY('08.12.2016'));
            expect(formatRange(from, to)).to.equal('1 Jan - 8 Dec');
        });

        it('should format correctly for different years', () => {
            let currentYear = getCurrentYear();
            let from = parseDDMMYYYY('01.12.2010');
            let to = setYear(parse('08.12.2015', 'DD.MM.YYYY'), currentYear);
            expect(formatRange(from, to)).to.equal(`1 Dec 2010 - 8 Dec ${currentYear}`);
        });
    });

    describe('formatDDMMYYYY', () => {
        it('should format correctly', () => {
            let date = parseDDMMYYYY('01.12.2016');
            expect(formatDDMMYYYY(date)).to.equal('01.12.2016');
        });
    });

    describe('formatWeekDay', () => {
        it('should format correctly', () => {
            let date = parseDDMMYYYY('01.12.2016');
            expect(formatWeekDay(date)).to.equal('Th');
        });
    });

    describe('formatD', () => {
        it('should format correctly', () => {
            let date = parseDDMMYYYY('01.12.2016');
            expect(formatD(date)).to.equal('1');
        });
    });

    describe('parseDDMMYYYY', () => {
        it('should format correctly', () => {
            let date = parseDDMMYYYY('01.12.2016');
            expect(formatDDMMYYYY(date)).to.equal('01.12.2016');
        });
    });
});