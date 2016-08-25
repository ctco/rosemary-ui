export const FEEDBACK_ACTION = 'FEEDBACK_ACTION';
export const REMOVED_FEEDBACK_ACTION = 'REMOVED_FEEDBACK_ACTION';
export const messages = {
    errors: [
        {
            msgId: 'id1',
            localizedMessage: 'Error message'
        }
    ],
    warnings: [
        {
            msgId: 'id2',
            localizedMessage: 'Warning message'
        }
    ],
    infos: [
        {
            msgId: 'id3',
            localizedMessage: 'Information message'
        }
    ],
    confirmations: [],
    successMsgs: [
        {
            msgId: 'id4',
            localizedMessage: 'Success message'
        }
    ]
};


export function feedbackAction() {
    return {
        type: FEEDBACK_ACTION,
        payload: {
            data: messages
        }
    };
}

export function removeFeedback(message) {
    return {
        type: REMOVED_FEEDBACK_ACTION,
        payload: message
    };
}