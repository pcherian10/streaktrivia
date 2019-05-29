import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer';
import questionReducer from './questionReducer'
import streakReducer from './streakReducer'
import questionsReducer from './questionsReducer';


export default combineReducers({
    auth: authReducer,
    question: questionReducer,
    questions: questionsReducer,
    streak: streakReducer,
    form: reduxForm
});