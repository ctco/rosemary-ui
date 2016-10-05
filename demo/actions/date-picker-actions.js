export const DATE_RANGE_PICKER_FROM = 'DATE_RANGE_PICKER_FROM';
export const DATE_RANGE_PICKER_TO = 'DATE_RANGE_PICKER_TO';
export const DATE_RANGE_PICKER_CHANGE = 'DATE_RANGE_PICKER_CHANGE';


export function updateDateFrom(value) {
    return {
        type: DATE_RANGE_PICKER_FROM,
        payload: value
    };
}

export function updateDateTo(value) {
    return {
        type: DATE_RANGE_PICKER_TO,
        payload: value
    };
}

export function changePopupState(open) {
    return {
        type: DATE_RANGE_PICKER_CHANGE,
        payload: open
    };
}