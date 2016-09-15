import {DATE_RANGE_PICKER_FROM, DATE_RANGE_PICKER_TO} from '../actions/date-picker-actions';

const initialState = {
    from: null,
    to: null
};

export default function datePickerReducer(state = initialState, action) {
    switch (action.type) {

        case DATE_RANGE_PICKER_FROM:
            return {
                ...state,
                from: action.payload
            };

        case DATE_RANGE_PICKER_TO:
            return {
                ...state,
                to: action.payload
            };
    }

    return state;
}

