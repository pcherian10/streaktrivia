import { combineReducers } from 'redux';
import authReducer from './authReducer';
import questionReducer from './questionReducer'
import streakReducer from './streakReducer'

export default combineReducers({
    auth: authReducer,
    question: questionReducer,
    streak: streakReducer
});