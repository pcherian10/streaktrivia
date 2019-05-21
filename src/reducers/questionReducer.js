import { FETCH_QUESTION } from '../actions/types'

export default function(state = null, action) {
    console.log(action)
    switch(action.type) {
        case FETCH_QUESTION:
            return action.payload;
        default:
            return state;
    }
}


