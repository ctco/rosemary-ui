import {DATE_RANGE_PICKER_FROM, DATE_RANGE_PICKER_TO, DATE_RANGE_PICKER_CHANGE} from '../actions/date-picker-actions';

const initialState = {
    from: '',
    to: '',
    open: true
};

export default function datePickerReducer(state = initialState, action) {
    switch (action.type) {
        case DATE_RANGE_PICKER_FROM: {
            let open = !isDateEquals(action.payload, state.to);
            return {
                ...state,
                open,
                from: action.payload
            };
        }

        case DATE_RANGE_PICKER_TO: {
            let open = !isDateEquals(state.from, action.payload);
            return {
                ...state,
                open,
                to: action.payload
            };
        }
        case DATE_RANGE_PICKER_CHANGE: {
            return {
                ...state,
                open: action.payload
            };
        }
    }

    return state;
}

function isDateEquals(from, to) {
    if (from === '' && to === '') {
        return false;
    }

    return from === to;

}

