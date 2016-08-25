import { combineReducers } from 'redux';
import ButtonReducer from './button-reducer';
import formExample2 from './form-example2-reducer';
import feedbackReducer from './feedback-reducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    button: ButtonReducer,
    formExample2,
    form: formReducer,
    messages:feedbackReducer
});

export default rootReducer;
