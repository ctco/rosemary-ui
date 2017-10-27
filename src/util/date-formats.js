import { format, parse, isCurrentYear, isMonthTheSame, isYearTheSame, isToday } from './date-utils';

//01.12.2016 =>
const D = 'D'; // 1
const D_MONTH = 'D MMM'; // 1 Dec
const D_MONTH_YEAR = 'D MMM YYYY'; // 1 Dec 2016
const D_MONTH_TIME = 'D MMM HH:mm'; // 1 Dec 16:25
const SHORT_MONTH = 'MMM'; // Dec
const FULL_MONTH = 'MMMM'; // December
const MMM_YYYY = 'MMM YYYY'; // Dec 2016
const MONTH_YEAR_HEADER = 'MMMM, YYYY'; // December, 2016
const FULL_MONTH_YEAR = 'MMMM YYYY'; //December 2016
const DD_MM_YYYY = 'DD.MM.YYYY'; // 01.12.2016
const WEEK_DAY = 'dd'; // Th

function formatDMonthYear(date, hideYear = true) {
    if (isToday(date)) {
        return 'Today';
    }
    if (hideYear && isCurrentYear(date)) {
        return format(date, D_MONTH);
    } else {
        return format(date, D_MONTH_YEAR);
    }
}

function formatDMonthTime(date) {
    return format(date, D_MONTH_TIME);
}

function formatFullMonth(date) {
    return format(date, FULL_MONTH);
}

function formatDDMMYYYY(date) {
    return format(date, DD_MM_YYYY);
}

function formatWeekDay(date) {
    return format(date, WEEK_DAY);
}

function formatD(date) {
    return format(date, D);
}

function formatFullMonthYear(date) {
    if (isCurrentYear(date)) {
        return formatFullMonth(date);
    } else {
        return format(date, FULL_MONTH_YEAR);
    }
}

function formatShortMonth(month) {
    return format(month, SHORT_MONTH);
}

function formatShortMonthYear(month) {
    return format(month, MMM_YYYY);
}

function formatMonthYearHeader(month) {
    return format(month, MONTH_YEAR_HEADER);
}

function parseDDMMYYYY(date) {
    return parse(date, DD_MM_YYYY);
}

function formatRange(from, to) {
    let hideYear = isCurrentYear(from) && isYearTheSame(from, to);
    let fromFormatted = isMonthTheSame(from, to) ? format(from, D) : formatDMonthYear(from, hideYear);
    let toFormatted = formatDMonthYear(to, hideYear);
    return `${fromFormatted} - ${toFormatted}`;
}

export {
    DD_MM_YYYY,
    formatDMonthYear,
    formatDMonthTime,
    formatFullMonth,
    formatFullMonthYear,
    formatRange,
    formatDDMMYYYY,
    formatWeekDay,
    formatD,
    formatShortMonth,
    formatShortMonthYear,
    formatMonthYearHeader,
    parseDDMMYYYY
};
