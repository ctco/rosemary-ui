export const CHANGE_BUTTON = 'CHANGE_BUTTON';

export const changeButton = button => {
    return {
        type:CHANGE_BUTTON,
        payload: {
            button
        }
    };
};

