import type from '../../src/Feedback/types';

export const FEEDBACK_ACTION = 'FEEDBACK_ACTION';
export const REMOVED_FEEDBACK_ACTION = 'REMOVED_FEEDBACK_ACTION';

export const messages = [
    {
        id: 'id1',
        text: 'Error message',
        type: type.error
    },
    {
        id: 'id2',
        text: 'Warning message',
        type: type.waring
    },
    {
        id: 'id3',
        text: 'Information message',
        type: type.info
    },
    {
        id: 'id4',
        text: 'Success message',
        type: type.success
    }
];


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