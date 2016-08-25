import Immutable from 'immutable';

const initalState = Immutable.fromJS({});

let CHANGE_BUTTON_COLOR;

CHANGE_BUTTON_COLOR = (state = initalState, action) => {
    return state;
};

export {
    CHANGE_BUTTON_COLOR
};
