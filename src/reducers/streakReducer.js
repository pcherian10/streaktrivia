import { FETCH_STREAK } from '../actions/types'

export default function(state = {}, action) {
    console.log('action', action)
    switch (action.type) {
        case FETCH_STREAK:
            return action.payload;
        default:
            return state;
    }
}