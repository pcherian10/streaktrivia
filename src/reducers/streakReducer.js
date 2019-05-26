import { UPDATE_STREAK } from '../actions/types'

export default function(state = {}, action) {
    console.log('action', action)
    switch (action.type) {
        case UPDATE_USER:
            return action.payload;
        default:
            return state;
    }
}