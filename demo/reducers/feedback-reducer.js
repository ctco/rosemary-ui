import {FEEDBACK_ACTION, REMOVED_FEEDBACK_ACTION} from '../actions/feedback-action';

const initialState = {
    errors: [],
    warnings: [],
    infos: [],
    successMsgs: []
};

export default function feedbackReducer(state = initialState, action) {
    switch (action.type) {
        case FEEDBACK_ACTION:
        {
            let data = action.payload.data;

            return {
                ...state,
                ...data
            };
        }
        case REMOVED_FEEDBACK_ACTION:
        {
            let filteredMessages = state[action.payload.type].filter((message) => {
                return action.payload.text !== message.localizedMessage;
            });

            let newMessages = {...state};
            newMessages[action.payload.type] = filteredMessages;
            return newMessages;
        }
        default:
            return state;
    }
}