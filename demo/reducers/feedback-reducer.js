import {FEEDBACK_ACTION, REMOVED_FEEDBACK_ACTION} from '../actions/feedback-action';

const initialState = [];

export default function feedbackReducer(state = initialState, action) {
    switch (action.type) {
        case FEEDBACK_ACTION: {
            let data = action.payload.data;
            return state.concat(data);
        }
        case REMOVED_FEEDBACK_ACTION: {
            return state
                .filter((message) => message.id !== action.payload);
        }
        default:
            return state;
    }
}